const db = require("../db/models");
const Customer = db.Customer;
const BillingDetails = db.BillingDetails;
const Meter = db.Meter;
const CustomerResource = require('../resources/CustomerResource')
const CustomerCollection = require('../resources/collections/CustomerCollection')
const Paging = require('../helpers/Paging')
const { Op } = require('sequelize')
const ResponseType = require('../enums/ResponseType')
const MeterResource = require('../resources/MeterResource')

module.exports = {

    async getNewId() {
        let id = 1;
        let limit = 1;
        let order = [
            ['CId', 'DESC']
        ];

        await Customer.findAll({
            //    where: condition,
            order: order,
            limit,
        })
            .then(async data => {
                //console.log("data.rows.........",data[0]);
                if (data[0] !== undefined)
                    id = data[0].CId + 1;
            });

        return id;
    },

    async create(req, res) {
        let response = null;
        // let { CName, Code, contact, MobNo, Email, ContactPerson, Add1, TelNo, enable_date, disable_date, status, MeterId, claimedPer, CoID } = req.body;
        let { CName, Code,mobile, Email, contact_person, address, enable_date, disable_date, status, MeterId } = req.body;

        // enable_date is set to be not null default value to NOW
        enable_date = enable_date == '' ? new Date() : enable_date;
        disable_date = disable_date == '' ? null : disable_date;
        if (status) {
            disable_date = null;
        }

        const id = await module.exports.getNewId();

        const customer = await Customer.create(
            {
                CId: id,
                CName, Code, contact, mobile, Email, contact_person, address, enable_date,
                disable_date, status, MeterId,
                created_by: req.user.user_id,
            }
        );
        response = res.status(201).json({
            message: 'Customer created successfully.',
            customer: CustomerResource(customer)
        });
        return response;
    },
    async customers(req, res) {
        let { response_type } = req.params;
        if (!response_type) {
            response_type = ResponseType.FULL;
        }
        if (response_type === ResponseType.PAGINATED) {
            console.log("\n\n response paginated");

            const { size, currentPage, search, sortBy, orderBy } = req.query;
            const { limit, offset } = Paging.getPagination(currentPage, size);
            let condition = {
                [Op.or]: [
                    {
                        CName: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        Code: {
                            [Op.like]: `%${search}%`
                        }
                    },
                ]
            }
            //// as for grid data all customers should be returned
            // condition = Object.assign(
            //     {
            //         status: true,
            //     },condition);    

            let order = [
                ['Code', 'ASC']
            ];
            if (sortBy) {
                order = [[sortBy, orderBy]]
            }
            await Customer.findAndCountAll({
                where: condition,
                order: order,
                limit,
                offset
            })
                .then(async data => {
                    const customers = await CustomerCollection(data.rows);
                    const pagination = await Paging.getPagingData(data, currentPage, limit, search);
                    res.status(200).json({ customers, pagination });
                });
        } else if (response_type === ResponseType.FULL) {
            console.log("\n\n response full");

            // this is usually for combos, only get enabled customers
            let condition = {
                status: true,
            };
            let order = [
                ['Code', 'ASC']
            ];

            let customers = await Customer.findAll({
                where: condition,
                order: order,
            });
            console.log("customers : ", customers)

            return res.status(200).json({ customers: await CustomerCollection(customers) })
        }
    },

    async companyCustomers(req, res) {
        const CoID = req.params.CoID;
        const customers = await Customer.findAll({
            where: {
                CoID: CoID
            }
        });
        return res.status(200).json({ customers: await CustomerCollection(customers) });
    },

    async customer(req, res) {
        let response = null;
        const id = req.params.id;
        const customer = await Customer.findByPk(id);
        response = res.status(200).json({ customer: await CustomerResource(customer) });
        return response;
    },
    async update(req, res) {
        const id = req.params.id;
        let { CName, Code, contact, MobNo, Email, ContactPerson, Add1, TelNo, enable_date, disable_date, status, MeterId, claimedPer, CoID } = req.body;
        // enable_date is set to be not null default value to NOW
        enable_date = enable_date == '' ? new Date() : enable_date;
        disable_date = disable_date == '' ? null : disable_date;
        if (status) {
            disable_date = null;
        }
        let customer = await Customer.findByPk(id);
        customer.set({
            CName, Code, contact, MobNo, Email, ContactPerson, Add1, TelNo, enable_date,
            disable_date, status, MeterId, claimedPer, CoID,
            updated_by: req.user.user_id,
        })
        await customer.save()
        return res.status(200).json({ customer: await CustomerResource(customer) });
    },
    async destroy(req, res) {
        const id = req.params.id;
        const customer = await Customer.findByPk(id);

        // check if any bill is generated for this customer
        const billingDetails = await BillingDetails.findAll({
            where: {
                CID_web: id,
            }
        })
        if (billingDetails.length > 0) {
            return res.status(409).json({ 'message': 'Cannot delete, Bill(s) generated for this customer.' });
        } else {
            await customer.destroy();
        }

        return res.status(200).json({ 'message': 'Customer deleted successfully.' });
    },
    //    getCustomerFloor: async function (MeterId) {
    async getCustomerFloor(MeterId) {

        //console.log("Meter id............", MeterId);

        const meter = await Meter.findAll({
            where: {
                id: MeterId,
            }
        })
        meter = await MeterResource(meter);
        const floor = meter.floor;

        return floor;
    },

    async floorCustomers(req, res) {
        const floor_id = req.params.floor_id;

        let customers = await db.sequelize.query(`SELECT cs.* FROM customer_web AS cs 
        WHERE cs.CID IN (SELECT b.Cid FROM customer_sales AS b WHERE b.MeterId IN 
					(SELECT c.id FROM meters AS c WHERE c.floor_id = ${floor_id}))`, {
            type: db.sequelize.QueryTypes.SELECT
        })

        return res.status(200).json({ customers: await CustomerCollection(customers, ResponseType.COMPACT) })
    }

}


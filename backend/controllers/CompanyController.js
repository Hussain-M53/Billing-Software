const db = require("../db/models");
const Company = db.Company;
const Paging = require('../helpers/Paging')
const {Op} = require('sequelize')
const ResponseType = require('../enums/ResponseType')
const CompanyResource = require('../resources/CompanyResource')

module.exports = {
    async getDefaultCoID(){
        // default company
        return 1;
    },

    async getNewId(){
        let id=1;
        let limit=1;
        let order = [
            ['CoID', 'DESC']
        ];

        await Company.findAll({
        //    where: condition,
            order: order,
            limit,
        })
        .then(async data => {
            //console.log("data.rows.........",data[0]);
            if (data[0] !== undefined) 
                id = parseInt(data[0].CoID) +1;
        });

        return id;
    },

    async create(req, res) {
        let response = null;
        const {Name, address, Contact, ContactPerson, Description, RatePerTonHour} = req.body;
        
        //console.log("body...............", req.body);
        const id = await module.exports.getNewId();
        //console.log("new id.........",id);

        const company = await Company.create({
            CoID: id,
            Name: Name,
            Add1: address,
            Contact: Contact,
            ContactPerson: ContactPerson,
            Description: Description,
            RatePerTonHour: RatePerTonHour,
            //LLDate: now(),
            //created_by: req.user.user_id,
        });
        response = res.status(201).json({message: 'Company created successfully.', company: company});
        return response;
    },
    async companies(req, res) {
        let responseType = req.params.response_type;
        if (!responseType) {
            responseType = ResponseType.FULL;
        }
        if (responseType == ResponseType.PAGINATED) {
            const {size, currentPage, search, sortBy, orderBy} = req.query;
            const {limit, offset} = Paging.getPagination(currentPage, size);
            const condition = {
                [Op.or]: [
                    {
                        Name: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        Description: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
            let order = [
                ['CoID', 'ASC']
            ];
            if (sortBy) {
                order = [[sortBy, orderBy]]
            }
            await Company.findAndCountAll({
                where: condition,
                order: order,
                limit,
                offset
            })
                .then(async data => {
                    const companies = data.rows;
                    const pagination = await Paging.getPagingData(data, currentPage, limit, search);
                    res.send({companies, pagination});
                });
        } else if (responseType === ResponseType.FULL) {
            let companies = await Company.findAll();
            return res.status(200).json({companies})
        }
    },
    async company(req, res) {

        let response = null;
        let id = req.params.id;
        
        if (id === 'undefined') 
            id=1; // default company

        let company={};
        try {
            company = await CompanyResource(await Company.findByPk(id));
        } catch (error) {
            console.error('Error SQL query:', error);
        }

        response = res.status(200).json({company: company});
        return response;
    },
    async companyCompact(req, res) {

        let response = null;
        let id = req.params.id;
        
        if (id === 'undefined') 
            id=1; // default company

        //console.log("\n\nid",id);

        let company={};
        try {
            company = await CompanyResource(await Company.findByPk(id));
        } catch (error) {
            console.error('Error SQL query:', error);
        }

        //console.log(".......Company",company);

        response = res.status(200).json({company: company});
        return response;
    },
    async update(req, res) {
        let response = null;
        const id = req.params.id;
        const {Name, address, Contact, ContactPerson, Description, RatePerTonHour} = req.body;
        // const company = await Company.findByPk(id);
        const company = await Company.update({
            Name: Name,
            Add1: address,
            Contact: Contact,
            ContactPerson: ContactPerson,
            Description: Description,
            RatePerTonHour: RatePerTonHour,
        }, {where: {CoID: id}})
        response = res.status(200).json({company: company});
        return response;
    },
    async destroy(req, res) {
        const id = req.params.id;
        const company = await Company.findByPk(id);
        const customers = await company.getCustomers();
        const floors = await company.getFloors();
        const meters = await company.getMeters();
        if (customers.length > 0 || floors.length > 0 || meters.length > 0) {
            return res.status(409).json({'message': 'This company associated with some floors, meters or customers'});
        } else {
            await Company.destroy({
                where: {
                    CoID: id
                }
            })
            return res.status(200).json({'message': 'Company deleted successfully.'});
        }

    },
}


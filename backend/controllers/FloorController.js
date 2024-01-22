const db = require("../models");
const Floor = db.Floor;
const Space = db.Space;
const FloorResource = require('../resources/FloorResource')
const FloorCollection = require('../resources/collections/FloorCollection')
const Paging = require('../helpers/Paging')
const { Op } = require('sequelize')
const ResponseType = require('../enums/ResponseType')

module.exports = {
    async create(req, res) {
        let response = null;
        const { name, description } = req.body;

        const floor = await Floor.create({
            name: name,
            description: description,
            created_by: req.query.user_id,
        });

        response = res.status(201).json({
            message: 'Floor created successfully.',
            floor: FloorResource(floor)
        });

        return response;
    },
    async floors(req, res) {
        let responseType = req.params.response_type;
        if (!responseType) {
            responseType = ResponseType.FULL;
        }

        if (responseType == ResponseType.PAGINATED) {
            const { size, currentPage, search, sortBy, orderBy } = req.query;
            const { limit, offset } = Paging.getPagination(currentPage, size);
            const condition = {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
            let order = [
                ['id', 'ASC']
            ];
            if (sortBy) {
                order = [[sortBy, orderBy]]
            }
            await Floor.findAndCountAll({
                where: condition,
                order: order,
                limit,
                offset
            })
                .then(async data => {
                    const floors = await FloorCollection(data.rows);
                    const pagination = await Paging.getPagingData(data, currentPage, limit, search);
                    res.send({ floors, pagination });
                });
        } else if (responseType === ResponseType.FULL) {

            const condition = {};
            let floors = await Floor.findAll({
                where: condition,
            });
            return res.status(200).json({ floors })
        }

    },

    async floor(req, res) {
        let response = null;
        const id = req.params.id;
        const floor = await Floor.findByPk(id);
        response = res.status(200).json({ floor: await FloorResource(floor) });
        return response;
    },
    async update(req, res) {
        const id = req.params.id;
        const { name, description } = req.body;
        let floor = await Floor.findByPk(id);
        floor.set({
            name: name,
            description: description,
            updated_by: req.query.user_id,
        })
        await floor.save()
        return res.status(201).json({ message: 'Floor updated successfully.', floor: await FloorResource(floor) });
    },
    async destroy(req, res) {
        const id = req.params.id;
        
        let space = await Space.findAndCountAll({
            where: {
                floor_id: id
            },
        });

        if (space.count > 0) {
            return res.status(409).json({ message: 'This floor is associated with some spaces' });
        } else {
            await Floor.destroy({
                where: {
                    id: id
                }
            })
        }
        return res.status(200).json({ 'message': 'Floor deleted successfully.' });
    },
}


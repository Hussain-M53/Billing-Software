const db = require("../db/models");
const Space = db.Space;
const SpaceResource = require('../resources/SpaceResource')
const SpaceCollection = require('../resources/collections/SpaceCollection')
const Paging = require('../helpers/Paging')
const { Op } = require('sequelize')
const ResponseType = require('../enums/ResponseType')

module.exports = {
    async create(req, res) {
        let response = null;
        const { name, description, type, meter_id, floor_id } = req.body;

        const space = await Space.create({
            name: name,
            type: type,
            description: description,
            meter_id: meter_id,
            floor_id: floor_id,
            created_by: req.query.user_id,
        });

        response = res.status(201).json({
            message: 'Space created successfully.',
            space: SpaceResource(space)
        });

        return response;
    },
    async spaces(req, res) {
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
                        type: {
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
            await Space.findAndCountAll({
                where: condition,
                order: order,
                limit,
                offset
            })
                .then(async data => {
                    console.log(data.rows)
                    const spaces = await SpaceCollection(data.rows);
                    const pagination = await Paging.getPagingData(data, currentPage, limit, search);
                    res.send({ spaces, pagination });
                });
        } else if (responseType === ResponseType.FULL) {

            const condition = {};
            let spaces = await Space.findAll({
                where: condition,
            });
            return res.status(200).json({ spaces })
        }

    },

    async space(req, res) {
        let response = null;
        const id = req.params.id;
        const space = await Space.findByPk(id);
        response = res.status(200).json({ space: await SpaceResource(space) });
        return response;
    },
    async update(req, res) {
        const id = req.params.id;
        const { name, description, type, meter_id, floor_id } = req.body;
        let space = await Space.findByPk(id);
        space.set({
            name: name,
            type: type,
            description: description,
            meter_id: meter_id,
            floor_id: floor_id,
            updated_by: req.query.user_id,
        })
        await space.save()
        return res.status(200).json({ message: 'Space updated successfully.', space: await SpaceResource(space) });
    },
    async destroy(req, res) {
        const id = req.params.id;
        await Space.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({ 'message': 'Space deleted successfully.' });
    },
}


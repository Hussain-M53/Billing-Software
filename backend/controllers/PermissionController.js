const { Op } = require("sequelize");
const db = require("../db/models");
const Permission = db.Permission;

module.exports = {
    async permissions(req, res) {
        let response = null;
        let condition ={};

        // omit graphs as of now
        condition = {
            group_name: {
                [Op.notLike]: 'Graphs',
            }
        }
        // let order = [
        //     ['id', 'ASC']
        // ];
        const permissions = await Permission.findAll({
            where: condition,
//            order: order,
        });
        response = res.status(200).json({permissions: permissions});
        return response;
    },
}


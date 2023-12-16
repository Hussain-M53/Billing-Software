const {body, validationResult} = require('express-validator');
const Floor = require('../../db/models').Floor;
const Meter = require('../../db/models').Meter;
const {Op} = require('sequelize');
exports.MeterCreateRequest = [
    body('name')
        .not().isEmpty().trim().escape()
        .withMessage('Invalid building name entered.'),
    body('floor_id')
        .not().isEmpty()
        .withMessage('Floor is not selected'),
    body('history_config_id')
        .not().isEmpty()
        .withMessage('Meter table is not selected'),
    // body('CoID')
    //     .not().isEmpty()
    //     .withMessage('Invalid Company'),
    async (req, res, next) => {
        const errors = validationResult(req);
        const {name, floor_id} = req.body;
        let meter = await Meter.findOne({
            where: {
                [Op.and]: [
                    {name: name},
                    //{floor_id: floor_id},
                ]
            }
        });
        if (meter) {
            return res.status(409).json({message: 'Duplicate record found, please check.'}).send();
        }
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        const floor = await Floor.findByPk(floor_id);
        if (!floor)
            return res.status(422).json({message: 'Invalid floor'}).send();
        else
            next();
    }
]
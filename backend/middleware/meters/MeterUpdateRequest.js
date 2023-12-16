const {body, validationResult} = require('express-validator');
const Floor = require('../../db/models').Floor;
const Meter = require('../../db/models').Meter;
const {Op} = require('sequelize');
exports.MeterUpdateRequest = [
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
        let id = req.params.id;
        const errors = validationResult(req);
        const {name, floor_id, history_config_id} = req.body;
        let meter = await Meter.findOne({
            where: {
                [Op.and]: [
                    {name: name},
                    //{floor_id: floor_id},
                    {id: 
                        {
                            [Op.ne]: id,
                        }
                    },
                ]
            }
        });
        if (meter && meter.id != id) {
            return res.status(409).json({message: 'Duplicate record found, please check.'}).send();
        }
        let errs = errors.array();
        const floor = await Floor.findByPk(floor_id);
        const disabledMeter = await Meter.findOne({
            where: {
                history_config_id: history_config_id,
                status: true
            }
        })
        if (!floor)
            errs.push({
                msg: 'Invalid floor selected',
                param: 'floor_id'
            })
        if (disabledMeter && disabledMeter.id != id)
            errs.push({
                msg: 'History table is already attached to some other meter.',
                param: 'history_config_id'
            })
        if (errs.length > 0)
            return res.status(422).json({errors: errs});
        else
            next();
    }
]
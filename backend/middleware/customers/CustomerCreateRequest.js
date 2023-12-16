const {body, validationResult} = require('express-validator');
const {Op} = require("sequelize");
const Customer = require('../../db/models').Customer;
exports.CustomerCreateRequest = [
    body('CName')
        .not().isEmpty().trim().escape()
        .withMessage('Invalid name'),
    body('Code')
        .not().isEmpty().trim().escape()
        .withMessage('Invalid code'),
    body('MeterId')
        .not().isEmpty()
        .withMessage('Meter is not selected'),
    // body('CoID')
    //     .not().isEmpty()
    //     .withMessage('Invalid Company'),
    // body('contact')
    //     .not().isEmpty()
    //     .withMessage('Invalid contact entered.'),
    body('address')
        .not().isEmpty().trim().escape()
        .withMessage('Enter a valid address'),
    body('mobile')
        .not().isEmpty().trim().escape()
        .isMobilePhone()
        .withMessage('Enter a valid mobile number.'),
    body('contact_person')
        .not().isEmpty().trim().escape()
        .withMessage('Enter a valid contact person name.'),
    async (req, res, next) => {
        const errors = validationResult(req);
        const {CName, status, enable_date, disable_date, MeterId} = req.body;
        const oldCustomer = await Customer.findOne({
            where: {
                CName: CName
            }
        });
        if (oldCustomer)
            return res.status(409).json({message: 'Duplicate record found, please check.'}).send();
        let errs = errors.array();
        if (status) {
            if (enable_date == null || enable_date == '') {
                errs.push({
                    msg: 'Enable date is not selected',
                    param: 'enable_date'
                })
            }
        } else {
            if (disable_date == null || disable_date == '') {
                errs.push({
                    msg: 'Disable date is not selected',
                    param: 'disable_date'
                })
            }
        }

        if (MeterId == null) {
            errs.push({
                msg: 'No meter is selected',
                param: 'MeterId'
            })
        }
        if (errs.length)
            return res.status(422).json({errors: errs});
        else
            next();

    },
]
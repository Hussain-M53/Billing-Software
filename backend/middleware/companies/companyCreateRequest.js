const {body, validationResult} = require('express-validator');
const Company = require('../../db/models').Profile;
exports.companyCreateRequest = [
    body('Name')
        .not().isEmpty().trim().escape()
        .withMessage('Invalid company name entered.'),
    body('RatePerTonHour')
        .not().isEmpty().trim().escape()
        .withMessage('Invalid Rate per ton hour'),
    async (req, res, next) => {
        const errors = validationResult(req);
        const {Name} = req.body;
        //console.log('name ' + name)
        const oldCompany = await Company.findOne({
            where: {
                Name: Name,
            }
        });
        if (oldCompany)
            return res.status(409).json({message: 'Duplicate record found, please check.'}).send();
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        else
            next();
    }
]
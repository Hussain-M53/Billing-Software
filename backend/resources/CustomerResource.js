//const CustomerController = require("../controllers/CustomerController");
// const MeterResource = require('./MeterResource')
// const db = require("../db/models");
// const Meter = db.Meter;
const func = require("../middleware/permissions/CommonFunc");

// const getCustomerFlr = (MeterId) => {
//     if (MeterId == null)
//         return null;

//     const customerFloor = CustomerController.getCustomerFloor(MeterId);

//     return customerFloor;
// }

const CustomerResource = async (customer) => {
    return {
        CId: customer.CId,
        CName: customer.CName,
        Code: customer.Code,
        Email: customer.Email,
        MobNo: customer.MobNo,
        TelNo: customer.TelNo,
        ContactPerson: customer.ContactPerson,
        address: customer.Add1,
        enable_date: customer.enable_date,
        disable_date: customer.disable_date,
        status: customer.status,
        meter: await customer.getMeter(),
        floor: customer.MeterId == null ? null : await func.getCustomerFloor(customer.MeterId),
        //customer.MeterId == null ? null : await CustomerController.getCustomerFloor(customer.MeterId),
        MeterId: customer.MeterId,
        claimedPer: customer.claimedPer,
        CoID: customer.CoID,
    };
};


module.exports = CustomerResource;
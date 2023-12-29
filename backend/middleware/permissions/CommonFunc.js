const db = require('../../db/models');
const User = db.User;
const Meter = db.Meter;

const isAssigned = async (req, permission_key) => {
    const user = await User.findOne({
        where: {
            id: req.query.user_id
        }
    });
    let is_assigned = false
    let role = await user.getRole();
    if (role) {
        const permission = await getPermission(role, permission_key)
        console.log('permission', permission);
        if (permission && permission.is_assigned) {
            is_assigned = true
        }
    }
    return is_assigned;
}
const sendResponse = (is_assigned, res, next) => {
    if (is_assigned) {
        next()
    } else {
        return res.status(403).json({ 'message': 'Unauthorized access' });
    }
}
const getPermission = (role, permission_key) => {
    let permissions = role.permissions;
    if ((typeof permissions) == 'string') {
        permissions = JSON.parse(permissions);
    }
    return permissions.find(item => item.uq_key === permission_key);
}
const isSuperUser = async (user_id) => {
    const user = await User.findOne({
        where: {
            id: user_id
        }
    });
    let is_super = false;
    let role = await user.getRole();
    if (role) {
        if (role.key === '@super_user') {
            is_super = true;
        }
    }
    //console.log("/////////Super User ///////////////////", is_super);

    return is_super;
}
const getSpaceFloor = async (MeterId) => {

    let floor = await db.sequelize.query(`SELECT f.* FROM floors_web AS f 
    WHERE f.id IN (SELECT s.floor_id FROM spaces AS s WHERE s.meter_id = ${MeterId})`, {
        type: db.sequelize.QueryTypes.SELECT
    })

    if (floor.length > 0)
        return floor[0]; // first record
    else
        return null;
    //return floor;
}

const formatDate = (date) => {

    //console.log("\n\n\n date string",date);

    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatDate_DayMonth = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}`;
};

const tonFactor = () => {
    return (1000000 / 12000);
}

module.exports = {
    isAssigned,
    sendResponse,
    getPermission,
    isSuperUser,
    getSpaceFloor,
    formatDate,
    tonFactor,
    formatDate_DayMonth,
}
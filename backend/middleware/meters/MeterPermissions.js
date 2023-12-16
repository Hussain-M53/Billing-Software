const func = require('../permissions/CommonFunc')
const ViewMeter = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'view_meter');
    return func.sendResponse(is_assigned, res, next)
}
const CreateMeter = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'create_meter');
    return func.sendResponse(is_assigned, res, next)
}
const UpdateMeter = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'update_meter');
    return func.sendResponse(is_assigned, res, next)
}
const DeleteMeter = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'delete_meter');
    return func.sendResponse(is_assigned, res, next)
}
const PrintMeter = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'print_meter');
    return func.sendResponse(is_assigned, res, next)
}

module.exports = {
    ViewMeter,
    CreateMeter,
    DeleteMeter,
    UpdateMeter,
    PrintMeter,
}
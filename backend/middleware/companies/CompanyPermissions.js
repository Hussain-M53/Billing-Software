const func = require('../permissions/CommonFunc')
const ViewCompany = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'view_company');
    return func.sendResponse(is_assigned, res, next)
}
const CreateCompany = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'create_company');
    return func.sendResponse(is_assigned, res, next)
}
const UpdateCompany = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'update_company');
    return func.sendResponse(is_assigned, res, next)
}
const DeleteCompany = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'delete_company');
    return func.sendResponse(is_assigned, res, next)
}
const PrintCompany = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'print_company');
    return func.sendResponse(is_assigned, res, next)
}

module.exports = {
    ViewCompany,
    CreateCompany,
    DeleteCompany,
    UpdateCompany,
    PrintCompany,
}
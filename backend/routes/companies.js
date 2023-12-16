const express = require('express');
const auth = require("../middleware/AuthToken.js");
const {companyCreateRequest} = require("../middleware/companies/companyCreateRequest");
const router = express.Router();
const CompanyController = require("../controllers/CompanyController");
const CompanyPermissions = require("../middleware/companies/CompanyPermissions");

router.get("/all/:response_type", [auth, CompanyPermissions.ViewCompany], CompanyController.companies);
router.post("/create", [companyCreateRequest, auth, CompanyPermissions.CreateCompany], CompanyController.create);
router.delete("/:id", [auth, CompanyPermissions.DeleteCompany], CompanyController.destroy);
router.get("/:id", [auth, CompanyPermissions.ViewCompany], CompanyController.company);
router.put("/:id", [auth, CompanyPermissions.UpdateCompany], CompanyController.update);
router.get("/compact/:id", [auth, CompanyPermissions.ViewCompany], CompanyController.companyCompact);

module.exports = router;

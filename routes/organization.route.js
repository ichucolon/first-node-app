const express = require("express");
const router = express.Router();

const OrganizationController = require("../controllers/organization.controller");

router.get("/organizations", OrganizationController.GetAllOrganizations);
router.post("/organization", OrganizationController.AddOrganization);
router.put("/organization/:id", OrganizationController.UpdateOrganization);
router.delete("/organization/:id", OrganizationController.DeleteOrganization);

module.exports = router;

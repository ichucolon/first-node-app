const Organization = require("../models/organization.model");
const organizationService = require("../services/organization.service");
const OrganizationService = require("../services/organization.service");

const GetAllOrganizations = async (req, res) => {
  try {
    const organizations = await OrganizationService.Find();
    return res.status(200).json({
      message: "OK",
      data: organizations,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const AddOrganization = async (req, res) => {
  try {
    const { name, description, country, city, picture } = req.body;

    const existing_organization = await OrganizationService.FindOne({
      name,
    });

    if (existing_organization) {
      return res.status(409).json({
        message: "Data exists already",
      });
    }

    await OrganizationService.Create({
      name,
      description,
      country,
      city,
      picture,
    });

    return res.status(200).json({
      message: "Data inserted.",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const UpdateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, country, city, picture } = req.body;

    const organization = await OrganizationService.FindOne({
      _id: id,
    });

    if (!organization) {
      return res.status(404).json({
        message: "Data not found.",
      });
    }

    const updatedData = await OrganizationService.FindOneAndUpdate(
      { _id: id },
      { name, description, country, city, picture }
    );

    return res.status(200).json({
      message: "Data updated.",
      data: updatedData,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

const DeleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    await OrganizationService.DeleteOne({ _id: id });
    return res.status(200).json({
      message: "Data deleted.",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

// _execute = async (req, res, next) => {
//   try {
//     await next();
//   } catch (error) {
//     console.log(error);
//     return res.status(403).json({
//       message: "Ipinagbabawal",
//     });
//   }
// };

module.exports = {
  GetAllOrganizations,
  AddOrganization,
  UpdateOrganization,
  DeleteOrganization,
};

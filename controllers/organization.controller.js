const Organization = require("../models/organization.model");
const OrganizationService = require("../services/organization.service");

const GetAdminsByOrganization = async (req, res) => {
  const { organization_id } = req.params;
  try {
    const admins = await OrganizationService.FindOneAndPopulate(
      { _id: organization_id },
      "admins"
    );
    return res.status(200).json({
      message: "OK",
      data: admins,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

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
    const { name, description, country, city, picture, admins } = req.body;

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
      admins,
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
    const { organization_id } = req.params;
    const { name, description, country, city, picture, admins } = req.body;

    const organization = await OrganizationService.FindOne({
      _id: organization_id,
    });

    if (!organization) {
      return res.status(404).json({
        message: "Data not found.",
      });
    }

    const updatedData = await OrganizationService.FindOneAndUpdate(
      { _id: organization_id },
      { name, description, country, city, picture, admins }
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
    const { organization_id } = req.params;
    await OrganizationService.DeleteOne({ _id: organization_id });
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
  GetAdminsByOrganization,
  GetAllOrganizations,
  AddOrganization,
  UpdateOrganization,
  DeleteOrganization,
};

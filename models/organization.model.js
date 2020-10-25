const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: String,
  description: String,
  country: String,
  city: String,
  picture: String,
});

const Organization = mongoose.model(
  "organization",
  OrganizationSchema,
  "organization"
);

module.exports = Organization;

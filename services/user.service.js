const User = require("../models/user.model");

const Find = async () => {
  const users = await User.find({});
  return users;
};

const FindOne = async (query) => {
  const user = await User.findOne(query);
  return user;
};

const Create = async (data) => {
  const user = await User.create(data);
  return user;
};

const FindOneAndUpdate = async (filter, data, options = {}) => {
  const user = await User.findOneAndUpdate(filter, data, {
    new: true,
    ...options,
  });
  return user;
};

const DeleteOne = async (filter) => {
  const user = await User.deleteOne(filter);
  return user;
};

const FindOneAndPopulate = async (query, populate_field) => {
  const user = await User.findOne(query).populate(populate_field);
  const organizations = user.organizations;
  return organizations;
};

module.exports = {
  Find,
  FindOne,
  Create,
  FindOneAndUpdate,
  FindOneAndPopulate,
  DeleteOne,
};

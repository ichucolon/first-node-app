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

const FindOneAndUpdate = async (filter, data) => {
  const user = await User.findOneAndUpdate(filter, { ...data });
  return user;
};

const DeleteOne = async (filter) => {
  const user = await User.deleteOne(filter);
  return user;
};

module.exports = {
  Find,
  FindOne,
  Create,
  FindOneAndUpdate,
  DeleteOne,
};

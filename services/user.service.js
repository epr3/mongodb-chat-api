const User = require('../models/user');

const createUser = async data => {
  try {
    const user = new User({
      email: data.email,
      password: data.password,
      name: data.name
    });
    return await user.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUsers = async () => {
  try {
    return await User.find().exec();
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createUser,
  getUsers
};

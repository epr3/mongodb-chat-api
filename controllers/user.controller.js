const userService = require('../services/user.service');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = {
  getUsers
};

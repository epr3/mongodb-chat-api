const userService = require('../repositories/user.repository');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await userService.getUser({ id: req.user._id });
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = {
  getUsers,
  getUser
};

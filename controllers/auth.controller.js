const jwt = require('jsonwebtoken');
const userService = require('../repositories/user.repository');

const generateToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await userService.createUser({ email, password, name });
    res.status(201).json({
      token: `JWT ${generateToken({ id: user._id })}`,
      user: user
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const loginUser = async (req, res) => {
  res.status(201).json({
    token: `JWT ${generateToken({ id: req.user._id })}`,
    user: req.user
  });
};

module.exports = {
  registerUser,
  loginUser
};

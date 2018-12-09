const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

UserSchema.pre('save', async function(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (e) {
    throw new Error(e.message);
  }
});

UserSchema.methods.isPasswordValid = async function(password) {
  try {
    return await bcrypt.compare(this._doc.password, password);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = mongoose.model('User', UserSchema);

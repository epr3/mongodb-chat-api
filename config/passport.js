const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JWTStrategy(opts, async (jwt_payload, done) => {
    const userObj = await User.findById(jwt_payload.id).exec();
    console.log(userObj);
    if (!userObj) done(null, false, { message: 'token is not valid' });
    done(null, userObj);
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      const userObj = await User.findOne({ email }).exec();
      if (!userObj || !userObj.isPasswordValid(password))
        return done(null, false, {
          message: 'passwords do not match'
        });
      return done(null, userObj);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;

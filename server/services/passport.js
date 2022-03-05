const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  return done(null, user);
});

const localVerify = async function (req, email, password, done) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const newUser = await User.create({ email, password, userType : req.body.type, name : req.body.name });
      return done(null, newUser);
    }
    if (password !== user.password) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.log(error);
  }
};

const localStrategy = new passportLocal.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  localVerify
);

passport.use('local', localStrategy);

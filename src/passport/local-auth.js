const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const Data = require('../models/index');
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await Data.findById(id);
    done(null, user);
});

passport.use('local-signup', new PassportLocal({
    usernameField: 'nickname',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await Data.findOne({ nickname: username });
    if (user) {
        return done(null, false, req.flash('signupMessage', 'The emal is already taken.'));
    } else {
        const newUser = new Data();
        newUser.nickname = username;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-signin', new PassportLocal({
    usernameField: 'nickname',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, nickname, password, done) => {
    const user = await Data.findOne({nickname: nickname});
    console.log(user);
    if(!user) {
      return done(null, false, req.flash('signinMessage', 'No User Found'));
    }
    if(!user || !bcrypt.compareSync(password, user.password)) {
      return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    return done(null, user);
  }));
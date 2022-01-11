const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const Data = require('../models/index');


passport.serializeUser((user, done)=>{
    done(null, user._id);
});

passport.deserializeUser(async (id, done)=>{
   const user = await Data.findById(id);
   done(null, user);
});

passport.use('local-signup', new PassportLocal({
    usernameField: 'nickname',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const newUser = new Data();
    newUser.nickname = username;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null, newUser);
}));
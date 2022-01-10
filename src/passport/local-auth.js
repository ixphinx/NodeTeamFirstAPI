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
    nicknameField: 'nickname',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nickname, password, done)=>{
    const user = new Data();
    user.nickname = nickname;
    user.password = password;
    console.log(nickname + ' ' + password);
    await user.save();
    done(null, user);
}));
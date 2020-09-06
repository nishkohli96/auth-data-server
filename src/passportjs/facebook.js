const passport = require('passport');
const FBStrategy = require('passport-facebook').Strategy;
const express = require('express');

const { fb_clientID, fb_clientSecret, fb_callbackURL, fb_profileFields } 
    = require('../constants');
const router = express.Router();

passport.use('facebook',new FBStrategy({
      clientID: fb_clientID,
      clientSecret: fb_clientSecret,
      callbackURL: fb_callbackURL,
      profileFields: fb_profileFields
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log("accessToken: " + accessToken);
        console.log("refreshToken: " + refreshToken);
        console.dir(profile);
        return cb(null, profile);
    })
);

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

router.get('/facebook',
    passport.authenticate('facebook', { scope: ['user_friends', 'email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/fail' }),
    function(req, res) {
    // Successful authentication, redirect home.
        res.redirect('/auth/success');
    });

module.exports = router;
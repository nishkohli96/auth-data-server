const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const express = require('express');

const {
    google_clientID,
    google_clientSecret,
    google_callbackURL,
    google_scope,
} = require('_pkgroot/constants');
const router = express.Router();

passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: google_clientID,
            clientSecret: google_clientSecret,
            callbackURL: google_callbackURL,
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            console.log('accessToken: ' + accessToken);
            console.log('refreshToken: ' + refreshToken);
            console.dir(profile);
            return done(null, profile);
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

router.get('/google', passport.authenticate('google', { scope: google_scope }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/fail' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/auth/success');
    }
);

module.exports = router;

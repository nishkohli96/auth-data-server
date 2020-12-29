const passport = require('passport');
const GoogleStrategy = require('passport-github').Strategy;
const express = require('express');

const {
    github_clientID,
    github_clientSecret,
    github_callbackURL,
} = require('_nodesrc/constants');
const { connectToDB } = require('_mongo/mongoose');
const router = express.Router();

passport.use(
    'github',
    new GoogleStrategy(
        {
            clientID: github_clientID,
            clientSecret: github_clientSecret,
            callbackURL: github_callbackURL,
        },
        async function (accessToken, refreshToken, profile, cb) {
            let User = await connectToDB();
            const userObj = {
                name: profile._json.name,
                email: profile._json.email,
                avatar_url: profile._json.avatar_url,
            };
            /* Returns the user if it is already created, else creates a new user */
            User.findOrCreate(userObj, function (err, user) {
                console.log('fn error: ', err);
                console.log('fn user: ', user);
                return cb(err, user);
            });
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

router.get('/github', passport.authenticate('github'));

router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/fail' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/auth/success');
    }
);

module.exports = router;

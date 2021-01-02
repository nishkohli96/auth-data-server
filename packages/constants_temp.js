/*  Rename this file as constants.js, supply appropriate values from your side,
    and you're good to go. */

/* Server Settings */
const port = 5000;

/* MongoDB Constants */
const server = '';
const username = '';
const pswd = '';
const dbName = '';
const collectionName = '';
const usersCollection = '';
const airbnb_DB = '';
const airbnb_collection = '';
const restaurants_DB = '';

/* For validations, refer here -
    https://mongoosejs.com/docs/validation.html
*/
const userSchema = {
    name: { type: String, default: '' },
    email: { type: String, unique: true },
    avatar_url: { type: String, default: '' },
    dateCreated: { type: Date, default: Date.now },
};

/* Passport-Facebook */
const fb_clientID = '';
const fb_clientSecret = '';
const fb_callbackURL = `http://localhost:${port}/auth/facebook/callback`;
const fb_profileFields = ['id', 'displayName', 'photos', 'email'];

/* Passport-Github */
const github_clientID = '';
const github_clientSecret = '';
const github_callbackURL = `http://localhost:${port}/auth/github/callback`;

/* Passport-Google */
const google_clientID = '';
const google_clientSecret = '';
const google_callbackURL = `http://localhost:${port}/auth/google/callback`;
const google_scope = ['https://www.googleapis.com/auth/plus.login'];

module.exports = {
    port,
    server,
    username,
    pswd,
    dbName,
    collectionName,
    usersCollection,
    userSchema,
    airbnb_DB,
    airbnb_collection,
    restaurants_DB,
    fb_clientID,
    fb_clientSecret,
    fb_callbackURL,
    fb_profileFields,
    github_clientID,
    github_clientSecret,
    github_callbackURL,
    google_clientID,
    google_clientSecret,
    google_callbackURL,
    google_scope,
};

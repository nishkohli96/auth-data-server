/* Server Settings */
const port = 4000;

/* MongoDB Constants */
const server = 'cluster0.tlouv.mongodb.net';
const username = 'nish1896';
const pswd = 'dragon123Nish';
const dbName = 'MyDB';
const collectionName = 'authors';
const usersCollection = 'db_user';
const airbnb_DB = 'sample_airbnb';
const airbnb_collection = 'listingsAndReviews';
const restaurants_DB = 'sample_restaurants';

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
const fb_clientID = '2404026219845298';
const fb_clientSecret = 'ba19c0e51e424bf6e6000e394eb08c3b';
const fb_callbackURL = `http://localhost:${port}/auth/facebook/callback`;
const fb_profileFields = ['id', 'displayName', 'photos', 'email'];

/* Passport-Github */
const github_clientID = '526268fe03820d83a34e';
const github_clientSecret = '1f8c305248de643b3645bc633632bfc568927e32';
const github_callbackURL = `http://localhost:${port}/auth/github/callback`;

/* Passport-Google */
const google_clientID =
    '795172551721-vtbi4bobb9hfa7f55ktl8mmv07voki7t.apps.googleusercontent.com';
const google_clientSecret = 'kGCTJa1JQ_6boO9xebx33tPe';
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

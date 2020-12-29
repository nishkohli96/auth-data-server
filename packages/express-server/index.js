require('module-alias/register');
const app = require('_express_src/express-config');
const { port } = require('_pkgroot/constants');

app.listen(port || 5000, () => {
    console.log(`Server started at port : ${port}`);
});

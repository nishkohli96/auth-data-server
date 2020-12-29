require('module-alias/register');
const app = require('_nodesrc/express-config');
const { port } = require('_nodesrc/constants');

app.listen(port, () => {
    console.log(`Server started at port : ${port}`);
});

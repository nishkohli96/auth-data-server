const app = require('./src/express-config');
const { port } = require('./src/constants');

app.listen(port, () => {
    console.log(`Server started at port : ${port}`)
});

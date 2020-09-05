import app from './express-config';

const port = 5000;

app.listen(port, () => {
    console.log(`Server started at port : ${port}`)
});
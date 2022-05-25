const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserRoute = require('./routes/user');
const ProductRoute = require('./routes/product');
const CompanyRoute = require('./routes/company');
const dbConfig = require('./config/database.config.js');
const swaggerUI = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const swaggerUi = require("swagger-ui-express");
const app = express();
mongoose.createConnection("mongodb://127.0.0.1:27017/users-db");
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/controllers/User", require("./api"))
app.use("/controllers/Product", require("./api"))
app.use(bodyParser.json())
app.use(express.json())
app.use('/user',UserRoute)
app.use('/product', ProductRoute)
app.use('/company', CompanyRoute)

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

const port = 3000;
app.use(express.static('public'))
// app.use(passport.initialize());
// app.use(passport.session());
// require('config/passport');
app.set('view engine', 'ejs');
app.get('/',((req, res) => {
    res.render('index');
}))

app.get('/elements',((req, res) => {
    res.render('elements')
}))

app.get('/smth', ((req, res) => {
    res.render('smth')
}))

app.get('/catalog', ((req, res) => {
    res.render('catalog')
}))

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
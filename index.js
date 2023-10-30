const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
var logger = require('morgan')
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const dashboardController = require('./controllers/dashboardController');

const alulaController = require('./controllers/alulaController');
const abhaController = require('./controllers/abhaController');
const alhasaController = require('./controllers/alhasaController');

const contactController = require('./controllers/contactController');
const logoutController = require('./controllers/dashboardController');

// Connect to the MongoDB database
mongoose.connect("mongodb://0.0.0.0:27017/FinalDB", {
    
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

app.set('view engine', 'ejs');
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "Project.SESSION_SECRET", 
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));


app.route('/').get(dashboardController.dashboardPage);

app.route('/logout')
    .get(logoutController.logout)
    .post(logoutController.logout)
    


app.route('/login')
    .get(loginController.loginPage)
    .post(loginController.loginUser);

app.route('/register')
    .get(registerController.registerPage)
    .post(registerController.registerUser);

    app.route('/alula').get(alulaController.alulaPage);
    app.route('/abha').get(abhaController.abhaPage);
    app.route('/alhasa').get(alhasaController.alhasaPage);
    app.route('/contact').get(contactController.contactPage);
    app.route('/alryadh').get(alryadhController.alryadhPage);
    

    
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
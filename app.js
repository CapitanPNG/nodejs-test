// Framework

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());

// ------------------------------------------------



// Static-Path

const staticPath = (__dirname + '/public');
app.use(express.static(staticPath));

// ------------------------------------------------



// Sessions

const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const SESSION_DURATION_MS = (60 * 60 * 24 * 1000);

app.use(sessions({
    'name': 'nodejs_test',
    'secret': 'secret-key',
    'saveUninitialized': true,
    'cookie': {
        'path': '/',
        'maxAge': SESSION_DURATION_MS,
        'httpOnly': true,
        'sameSite': 'strict'
    },
    'resave': false
}));

app.use(cookieParser());

// ------------------------------------------------



// Routes

app.get('/', function (req, res) {
    res.redirect('/dashboard');
});

const registrationRoutes = require('./routes/registration.js');
const loginRoutes = require('./routes/login.js');
const logoutRoutes = require('./routes/logout.js');
const dashboardRoutes = require('./routes/dashboard.js');
const profileRoutes = require('./routes/profile.js');
const usersManagementRoutes = require('./routes/users-management.js');

app.use('/', registrationRoutes);
app.use('/', loginRoutes);
app.use('/', logoutRoutes);
app.use('/', dashboardRoutes);
app.use('/', profileRoutes);
app.use('/', usersManagementRoutes);

/*app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/pages/login.html');
});*/

// ------------------------------------------------



module.exports = app;
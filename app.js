const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


// Passport config
require('./authentication/passport')(passport);

// Database config
const db = require('./authentication/keys').MongoURI;

// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Parser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routesconst http = require('http');
// const app = require('./app');
// const port = process.env.PORT || 5000;

// const server = http.createServer(app);

// server.listen(port);
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const pe = require('parse-error');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

let app = express();

/*
Export and run database models
 */
let models = require("./models");

models.sequelize.authenticate().then(async () => {
  await models.sequelize.sync({ force: true });

  // Create super admin
  const User = models.users;
  await User.findOrCreate({
    where: { email: process.env.SUPER_ADMIN_EMAIL },
    defaults: {
      firstName: process.env.SUPER_ADMIN_FIRST_NAME,
      lastName: process.env.SUPER_ADMIN_LAST_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      role: 'Super Admin'
    }
  });

}).catch(err => {
  console.log(err);
});


// For BodyParser
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '200mb'
}));
app.use(bodyParser.json({ limit: '200mb' }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// The main page
app.get('/', function (req, res) {
  res.json({
    version: process.env.API_VERSION,
    status: true
  });
});

/*let template = require('./routes/template');
app.use('/v1', [ template ]);*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  let errorMessage = {};
  errorMessage.message = err.message;
  errorMessage.error = req.app.get('env') === 'development' ? err : {};

  errorMessage.status = err.status || 500;

  res.json(errorMessage);
});

module.exports = app;

process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});

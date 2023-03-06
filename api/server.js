// eslint-disable-next-line import/order
const { port } = require('./app/config/config');

global.CustomError = require('./app/services/CustomError'); // Error to globals

const helmet = require('helmet');
const express = require('express');
const compression = require('compression');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { cors } = require('./app/middlewares/cors');
const { errorHandler } = require('./app/services/errorHandler');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression()); // response
app.use(helmet()); // middleware HTTP
app.use(cors); // middleware

// Add Routes and tasks
const routes = require('./app/routes/index');

routes.map((x) => app.use(x.basePath, x.router));

app.use(express.static('public'));

// Main errorHandler
app.use((err, req, res, next) => { errorHandler(err, req, res, next); });

// assume 404 since no middleware responded
app.use((req, res) => {
  res.status(404)
    .json({
      code: 404,
      message: 'Not found',
      success: false,
      data: [],
    });
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const { port: checkPort } = server.address();

  console.log(`App listening at ${host}:${checkPort}`);
});

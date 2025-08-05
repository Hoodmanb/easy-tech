const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const connectDB = require("./utils/mongoDB");

// Set up mongoose connection
require('dotenv').config()

const { machineRouter, tagRouter, categoryRouter, powerRouter } = require("./routes/index")

const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: 'GET,POST'
// };

connectDB()

// app.use(cors(corsOptions));
app.use(cors())

app.use(logger('dev'));
app.use(express.json());

app.use("/api/machine", machineRouter)

app.use("/api/category", categoryRouter)

app.use("/api/tag", tagRouter)

app.use("/api/power", powerRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: res.locals.message,
    // Optionally include stack trace only in development
    ...(req.app.get('env') === 'development' && { stack: err.stack }),
  });
});

module.exports = app;
// module.exports.handler = serverless(app);
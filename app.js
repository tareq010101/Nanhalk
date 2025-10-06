require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// // const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
const app = express();
const cookieParser = require('cookie-parser');

const userRouter = require('./Router/userRouter');
const bookingRouter = require('./Router/bookingRoute.js');
const driverRouter=require('./Router/driverRouters.js')

app.use(express.json());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// app.use(xss());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('api/v1/driver',driverRouter)

module.exports = app;

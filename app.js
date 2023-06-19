require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const socketEvents = require('./socketEvents');

mongoose.connect(process.env.DB_PATH);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.set('etag', false);

const passport = require('./config/passport');

app.use(passport.initialize());

app.use(require('method-override')());
app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  app.use(function(err, req, res, next) {
    console.log('error');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const chatRoutes = require('./routes/chat.routes');

app.use(authRoutes);
app.use(userRoutes);
app.use(chatRoutes);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port ' + server.address().port);
});

const io = require('socket.io').listen(server);
socketEvents(io);

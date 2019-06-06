const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/patterns8', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected')
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'mongoose failed to connect')
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose is disconnected');
});

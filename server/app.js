const users = require('./routes/users');
const auth = require('./routes/auth');
const todo = require('./routes/todos');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.static(path.join(__dirname, 'build')));

app.use( cors() );

app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);

app.use('/api/todos', todo)

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = 8181;
http.listen(port, () => console.log(`Listening on port ${port}...`));
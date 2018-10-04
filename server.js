const express = require('express');
const mongoose = require('mongoose');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Db connect
mongoose.connect('mongodb://mongo:27017' , {
  useMongoClient: true
}); 

// Build model
const HttpCall = mongoose.model('httpCall', { name: String , time: String});

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/hello', (req, res) => {
  // Save call in db
  const  httpCal = new HttpCall({ name: req.query.name, time: Date.now()});
  httpCal.save().then(() => console.log(`save ${req.query.name} in db`));

  res.send(`Hello ${req.query.name}\n`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
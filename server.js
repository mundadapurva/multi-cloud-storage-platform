const express = require('express');
const env = require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');


// eslint-disable-next-line no-unused-vars
const Task = require('./api/models/todoListModel');
const Cloud = require('./api/models/multiCloudModel');
// created model loading here

const bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => {
    console.log('Unable to connect', err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello');
});

const routes = require('./api/routes/todoListRoutes'); // importing route
const routes1 = require('./api/routes/multiCloudRoutes'); // importing route
routes(app); // register the route
routes1(app); // register the route

app.listen(port, () => {
  console.log('Node.js + MongoDB RESTful API server started on: ' + port);
});

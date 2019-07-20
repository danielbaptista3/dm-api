const express = require('express');
const cors = require('cors');
const ModelIndex = require('./models');
const RouteManager = require('./routes');

ModelIndex
.openDatabase()
.then(_startServer)
.catch((err) => {
  console.error(err);
});

function _startServer() {

  const app = express();

  app.use(cors());
  app.options('*',cors());
  RouteManager.attach(app);

  app.listen(8081, function() {
    console.log('Server started on 8081...');
  });
}
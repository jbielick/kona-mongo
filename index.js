var MongoClient = require('thunkify-mongodb').MongoClient;
var mongodb = require('mongodb');
var delegate = require('delegates');
var BaseController = require('kona/lib/controller/abstract');

module.exports = function(app) {

  var db;

  app.on('hook:initialize', function* () {

    var client = new MongoClient(new mongodb.MongoClient());

    // expose on the app object
    this.mongo = db = yield client.connect(this.config.mongo);

    delegate(BaseController.prototype, 'app').getter('mongo');
  });

  app.on('hook:shutdown', function* () {
    yield db.close();
  });

};

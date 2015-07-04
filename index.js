var comongo = require('co-mongo');
var delegate = require('delegates');
var BaseController = require('kona/lib/controller/base');
var client;

module.exports = {

  required: function(app) {

    app.on('hook:initialize', this.initialize);
    app.on('hook:shutdown', this.shutdown);

  },

  initialize: function* (app) {
    var host;
    var connectionString;

    host = (this.config.mongo && this.config.mongo.host) || 'localhost';
    connectionString = 'mongodb://' + host + '/' + this.config.mongo.database;

    this.mongo = client = yield comongo.connect(connectionString);

    delegate(BaseController.prototype, 'app').access('mongo');
  },

  shutdown: function* () {
    client.end();
  }

};

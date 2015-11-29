var comongo = require('co-mongo');
var delegate = require('delegates');
var BaseController = require('kona/lib/controller/abstract');
var client;

module.exports = function(app) {

  app.on('hook:initialize', function* () {

    if (Object.prototype.toString.call(this.config.mongo) === '[object Object]') {
      // options form e.g. {host: , port: }
      comongo.configure(this.config.mongo);
      client = yield comongo.get();
    } else {
      // string connection form ex: 'mongodb://127.0.0.1:27017/test'
      client = yield comongo.connect(this.config.mongo);
    }

    // expose on the app object
    this.mongo = client;

    delegate(BaseController.prototype, 'app').access('mongo');
  });

  app.on('hook:shutdown', function* () {
    client.end();
  });

};

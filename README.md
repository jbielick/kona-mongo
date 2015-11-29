This [kona](https://github.com/jbielick/kona) mixin mounts a mongodb client connection
to the abstract controller prototype so you can do mongo queries from controllers and elsewhere.

Example config in `config/application.js`:

```js
  config.mongo = 'mongodb://localhost:27017/my_app_database';
```

These details will be passed straight to the mongo native client.

In your controller, you now have a mongo connection checked out from the pool:

```js
var users = yield this.mongo.collection('users');
var user = yield users.findOne({name: /creed/});
```
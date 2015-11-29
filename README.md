This [kona](https://github.com/jbielick/kona) mixin mounts a mongodb client connection
to the abstract controller prototype so you can do mongo queries from controllers and elsewhere.

Example config in `config/application.js`:

```js
  config.mongo = {
    host: '127.0.0.1',
    port: 27017,
    name: 'mydb',
    pool: 10,
    collections: ['users', 'products', 'orders']
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  };
```

These details will be passed straight to [`co-mongo`](https://github.com/thomseddon/co-mongo).

In your controller, you now have a mongo connection checked out from the pool:

```js
var user = yield this.users.findOne({name: /creed/});
```
const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');

module.exports = function (middlewares = []) {
  const app = new Koa();
  app.use(bodyParser());
  middlewares.forEach(middleware => app.use(middleware));
  return app;
}
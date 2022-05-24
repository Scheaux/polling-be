const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const { v4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const router = new Router();
const app = new Koa();
const port = process.env.PORT || 1733;
const server = http.createServer(app.callback());

app.use(cors());
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/messages/unread', async (ctx, next) => {
  const object = {
    status: 'ok',
    timestamp: Date.now(),
    messages: [
      {
        id: v4(),
        from: faker.name.findName(),
        subject: faker.hacker.phrase(),
        body: faker.lorem.paragraph(),
        received: faker.date.past(),
      },
      {
        id: v4(),
        from: faker.name.findName(),
        subject: faker.hacker.phrase(),
        body: faker.lorem.paragraph(),
        received: faker.date.past(),
      }
    ]
  };
  ctx.response.body = object;
  await next();
});

server.listen(port);

const Koa = require('koa');
const Router = require('koa-router');
const mockList = require('./mock/index');
const path = require('path');

const app = new Koa();
const router = new Router();

function getRes(fn, ctx) {
  const { url } = ctx;
  let timeout = 1000;
  if (url === '/api/sys/profile') {
    timeout = 200;
  }

  return new Promise(resolve => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, timeout);
  });
}

mockList.forEach(item => {
  const { url, method, response } = item;
  router[method](url, async ctx => {
    const res = await getRes(response, ctx);
    ctx.body = res;
    // ctx.status = 401;
  });
});

app.use(router.routes());
app.listen(3001, () => console.log('running on port 3001'));

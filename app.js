const Koa = require('koa')
const app = new Koa()
const host = 'http://localhost'
const port = 3002
const compose = require('koa-compose');
const MD = require('./middlewares/');
const config = require('./config')
const utils = require('./common/utils')

app.context.config = config;
app.context.utils = utils;
app.use(compose(MD))
app.on('error', (err, ctx) => {
    if (ctx) {
      ctx.body = {
        code: 9999,
        message: `程序运行时报错：${err.message}`
      };
    }
  });

app.listen(port,()=>{
    console.log(`server is running at ${host}:${port}`)
})
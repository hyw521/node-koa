const Router = require('koa-router')
const router = new Router()
const routerList = require('./routes')
const paramValidator = require('../middlewares/paramValidator');

routerList.forEach(item => {
    const { method, path, controller,valid } = item
    router[method](path,paramValidator(valid), controller)
});

module.exports = router
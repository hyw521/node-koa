const formidable = require("./formidable");
const bodyparser = require("koa-bodyparser");
const router = require("../router/index");
const response = require("./response");
const error = require("./error");
const cors = require("@koa/cors");
const log = require("./log");
const proxy = require("koa-proxies");

// 上传文件解析参数
const mdFormidable = formidable();
// 解析body参数
const mdBodyparser = bodyparser({
  enableTypes: ["json", "form", "text", "xml"],
  formLimit: "56kb",
  jsonLimit: "1mb",
  textLimit: "1mb",
  xmlLimit: "1mb",
  strict: true,
});
/**
 * 统一返回格式
 */
const mdResHandler = response();
/**
 * 错误处理
 */
const mdErrorHandler = error();
/**
 * 跨域资源共享
 */
const mdCors = cors({
  origin: "*",
  credentials: true,
  allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
});
// 日志
const mdlog = log();

const mdRoute = router.routes();
const mdRouterAllowed = router.allowedMethods();
// 代理ip池
// const proxy = proxy({
//   target: "http://example.com",
//   changeOrigin: true,
// });

module.exports = [
  mdFormidable,
  mdBodyparser,
  mdlog,
  mdResHandler,
  mdErrorHandler,
  mdCors,
  mdRoute,
  mdRouterAllowed,
];

const { demo, excel } = require("../controllers/index");
const { vpDemo } = require("../verifyParams/index");
const routes = [
  {
    method: "get",
    path: "/form",
    controller: demo.post,
  },
  {
    method: "post",
    path: "/post/result",
    controller: demo.postResult,
  },
  {
    method: "get",
    path: "/test/validparams",
    valid: vpDemo.demo,
    controller: demo.testValid,
  },
  {
    method: "post",
    path: "/uploadFile",
    controller: demo.saveFile,
  },
  {
    method: "get",
    path: "/getExcelData",
    controller: excel.getExcelData,
  },
];

module.exports = routes;

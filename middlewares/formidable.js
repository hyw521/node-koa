const Formidable = require("formidable");
const { tempFilePath } = require("../config");
const fs = require("fs");
const path = require("path");
const sd = require("silly-datetime"); //格式化时间字符串

module.exports = () => {
  return async function (ctx, next) {
    if (ctx.request.path !== "/uploadFile") {
      await next();
    } else {
      const form = new Formidable({
        multiples: true,
      });
      await new Promise((reslove, reject) => {
        form.parse(ctx.req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            const oldpath = files.file.path;
            const newpath =
              `${process.cwd()}/${tempFilePath}/` +
              path.parse(files.file.name).name +
              sd.format(new Date(), "YYYYMMDDHHmmss") +
              path.parse(files.file.name).ext;
            fs.rename(oldpath, newpath, function (err) {
              if (err) {
                console.log("改名失败");
              }
            });
            ctx.request.body = { filePath: newpath };
            ctx.request.files = files.file;
            reslove();
          }
        });
      });
      await next();
    }
  };
};

const fs = require("fs");
const xlsx = require("node-xlsx");
const path = require("path");

// excel数据
// 最终数据
let finalArr = [];

function handelExcel(filePath) {
  const excelData = xlsx.parse(filePath);
  // excel的第一个sheet
  const excelSheet = excelData[0].data;
  // 表头
  const columns = excelSheet[0];
  // 表头对应的key
  const columnsObj = {
    id: "序号",
    title: "标题",
    content: "内容",
    btnName: "按钮名字",
    btnLink: "链接",
  };
  let JSONKey = [];
  // 设置JSON key值
  columns.forEach((item) => {
    for (key in columnsObj) {
      const itemKey = columnsObj[key];
      itemKey === item ? JSONKey.push(key) : "";
    }
  });
  // 表内容
  const jsonData = excelSheet.slice(1);
  jsonData.forEach((lineItem) => {
    // if (JSON.stringify(lineItem) !== "{}") {
    let arrItem = {};
    lineItem.forEach((item, index) =>
      Object.assign(arrItem, {
        [JSONKey[index]]: item
          .toString()
          .replace(/\r/g, "")
          .replace(/\n/g, "\\n"),
      })
    );
    if (JSON.stringify(arrItem) !== "{}") {
      finalArr.push(arrItem);
    }
    // }
  });
  generatJSON("./data/data.json", JSON.stringify(finalArr, null, "\t"));
}

function generatJSON(fileName, data) {
  fs.writeFile(fileName, data, "utf-8", function (err) {
    if (err) {
      console.log("errr");
    } else {
      console.log("success");
    }
  });
}

async function getExcelData(ctx) {
  // let result = handelExcel();
  let findJson = () => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "../data/data.json"),
        function (err, data) {
          if (err) {
            resolve({ code: -1, msg: "查询失败" + err });
            return console.error(err);
          }
          let jsonData = data.toString(); //将二进制的数据转换为字符串
          jsonData = JSON.parse(jsonData); //将字符串转换为json对象
          console.log("jsonData", jsonData);
          resolve({ jsonData });
        }
      );
    });
  };
  ctx.body = await findJson();
}

module.exports = {
  handelExcel,
  getExcelData,
};

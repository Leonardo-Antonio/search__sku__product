const xlsx = require("xlsx");
const fs = require("fs");

const getJsonToSheet = (route) => {
  let workbook = xlsx.readFile(route);
  let data = xlsx.utils.sheet_to_json(workbook.Sheets["data"]);
  return data;
};

const comparation = () => {
  const total = getJsonToSheet("total.xlsx");
  const search = getJsonToSheet("search_.xlsx");

  let final = [];
  search.forEach((value) => {
    total.forEach((valueTotal) => {
      if (value.name == valueTotal._SkuName) {
        value.sku_id = valueTotal._SkuId;
        final.push(value);
      }
    });
  });

  fs.writeFile("result.json", JSON.stringify(final), (err) => {
    if (err) {
      console.log("error");
    }
  });

  return final;
};

const convertToWorkbook = () => {
  const data = comparation();
  let ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "test");

  xlsx.writeFile(wb, "result.xlsx");
};

convertToWorkbook();

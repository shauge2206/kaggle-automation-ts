var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// func/handler.ts
var handler_exports = {};
__export(handler_exports, {
  download: () => download
});
module.exports = __toCommonJS(handler_exports);
var BASE_UPLOAD_FILE_NAME = process.env.BASE_UPLOAD_FILE_NAME;
var KAGGLE_USERNAME = process.env.KAGGLE_USERNAME;
var KAGGLE_KEY = process.env.KAGGLE_USERNAME;
var download = async (event) => {
  const outputFileName = `${BASE_UPLOAD_FILE_NAME}.zip`;
  console.log("123123123");
  console.log(BASE_UPLOAD_FILE_NAME);
  console.log(KAGGLE_USERNAME);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  download
});

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CustomConsole;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
_dotenv["default"].config();

// crear directorio logs en proyecto
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);
var logDir = _path["default"].join(_dirname, "..", "logs");
if (!_fs["default"].existsSync(logDir)) {
  _fs["default"].mkdirSync(logDir, {
    recursive: true
  });
}

// validar que tipo de log se van a generar como archivo
var logTypes = process.env.LOG_TYPES ? process.env.LOG_TYPES.split(",") : [];

// crear los archivos de los logs si no existen
logTypes.forEach(function (type) {
  var logFile = _path["default"].join(logDir, "".concat(type, ".log"));
  if (!_fs["default"].existsSync(logFile)) {
    _fs["default"].writeFileSync(logFile, "");
  }
});
function CustomConsole(params) {
  var origin = params.origin,
    _params$type = params.type,
    type = _params$type === void 0 ? "log" : _params$type,
    _params$info = params.info,
    info = _params$info === void 0 ? "" : _params$info;
  var headLog = "[".concat(new Date().toISOString(), "] origin: ").concat(origin, "\n");
  var logFile = _path["default"].join(logDir, "".concat(type, ".log"));
  var logMessage = headLog;
  if (typeof info === "string" || info instanceof String) {
    logMessage += "info: ".concat(info, "\n");
  } else if (Array.isArray(info)) {
    logMessage += "info: {\n".concat(info.map(function (item) {
      return "".concat(JSON.stringify(item));
    }).join("\n"), "\n}");
  } else if (_typeof(info) === "object") {
    logMessage += "info:{ \n".concat(Object.entries(info).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return "".concat(key, ": ").concat(JSON.stringify(value));
    }).join("\n"), "\n}");
  }
  if (process.env.LOG_CONSOLE_ACTIVE === "true") {
    switch (type) {
      case "warn":
        console.warn(headLog, info);
        break;
      case "error":
        console.error(headLog, info);
        break;
      default:
        console.log(headLog, info);
        break;
    }
  }
  if (logTypes.includes(type)) {
    _fs["default"].appendFile(logFile, logMessage, function (err) {
      if (err) {
        console.error("Error al escribir en el archivo de log ".concat(logFile, ": ").concat(err));
      }
    });
  }
}
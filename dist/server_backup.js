"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var dotenv = _interopRequireWildcard(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _multer = _interopRequireDefault(require("multer"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _sharp = _interopRequireDefault(require("sharp"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _customConsole = _interopRequireDefault(require("./utils/customConsole.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
dotenv.config();
// Configuración de Multer para un archivo
var storageSingle = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});

// Filtro para validar el campo esperado y el tipo de archivo
var fileFilterSingle = function fileFilterSingle(req, file, cb) {
  (0, _customConsole["default"])({
    origin: "fileFilterSingle",
    info: file
  });
  // Validar que el campo del archivo sea del nombre esperado
  if (file.fieldname !== "image") {
    return cb(new Error("El campo del archivo no es válido."), false);
  }
  // validar un campo especifico del formulario que sea requerido
  // if (!req.body || !req.body.image) {
  //   return cb(new Error('Campo de imagen no encontrado en la solicitud'));
  // }
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   return cb(new Error('Solo se aceptan imágenes'));
  // }
  cb(null, true);
};
var uploadSingle = (0, _multer["default"])({
  storage: storageSingle,
  fileFilter: fileFilterSingle
});

// Configuración de Multer para múltiples archivos (Max. 5 archivos)
var storageMultiple = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});

// Filtro para validar el campo esperado y el tipo de archivo
var fileFilterMultiple = function fileFilterMultiple(req, file, cb) {
  (0, _customConsole["default"])({
    origin: "fileFilterMultiple",
    info: file
  });
  // Validar que el campo del archivo sea del nombre esperado
  /*if (file.fieldname !== 'image') { 
  return cb(new Error('El campo del archivo no es válido.'), false);
  }*/
  // if (!req.body || !req.body.image) {
  //   return cb(new Error('No image field found in the request'));
  // }
  // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   return cb(new Error('Solo se aceptan imágenes'));
  // }
  cb(null, true);
};
var uploadMultiple = (0, _multer["default"])({
  storage: storageMultiple,
  fileFilter: fileFilterMultiple,
  limits: {
    files: 5
  }
});
var verify = _jsonwebtoken["default"].verify,
  sign = _jsonwebtoken["default"].sign;
var app = (0, _express["default"])();
app.use((0, _cors["default"])());

// Middleware para analizar el cuerpo de la solicitud
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

// middleware para verificar el token de acceso
function verifyToken(req, res, next) {
  // obtener el token de acceso de la cabecera de autorización
  var authHeader = req.headers.authorization;
  var token = authHeader && authHeader.split(" ")[1];

  // si no hay token, responder con un error 401
  if (!token) {
    return res.status(401).json({
      message: "No se proporcionó un token de acceso."
    });
  }

  // verificar y decodificar el token de acceso
  verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).json({
        message: "El token de acceso es inválido."
      });
    }

    // si el token es válido, agregar el objeto decodificado a la solicitud
    req.user = decoded;

    // continuar con la siguiente función de middleware
    next();
  });
}

// ruta de autenticación para generar un token de acceso
app.post("/api/auth", function (req, res) {
  var _req$body = req.body,
    username = _req$body.username,
    password = _req$body.password;
  console.log("QUE LLEGA ", username, password);
  // validar los detalles de autenticación del usuario
  // ...

  // si la autenticación es exitosa, generar un token de acceso
  var token = sign({
    username: username,
    password: password
  }, process.env.JWT_SECRET);

  // enviar el token de acceso al cliente
  res.json({
    token: token
  });
});

// ruta para subir una imagen y guardarla en tres tamaños diferentes
app.post("/api/images/single", verifyToken, uploadSingle.single("image"), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var filename;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (req.file) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", res.status(400).send("No se ha enviado un archivo."));
        case 2:
          // Procesar archivo y crear versiones en diferentes tamaños
          filename = req.file.filename;
          _context.prev = 3;
          _context.next = 6;
          return (0, _sharp["default"])(req.file.path).jpeg({
            quality: 80
          }).toFile("uploads/".concat(filename, "-original.jpg"));
        case 6:
          _context.next = 8;
          return (0, _sharp["default"])(req.file.path).resize({
            width: 640
          }).jpeg({
            quality: 80
          }).toFile("uploads/".concat(filename, "-medium.jpg"));
        case 8:
          _context.next = 10;
          return (0, _sharp["default"])(req.file.path).resize({
            width: 160
          }).jpeg({
            quality: 80
          }).toFile("uploads/".concat(filename, "-thumb.jpg"));
        case 10:
          // responder con un mensaje de éxito
          res.json({
            message: "La imagen se ha subido y procesado correctamente.",
            filename: filename
          });
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          // responder con un error si ocurre algún problema
          console.error(_context.t0);
          res.status(500).json({
            message: "Ocurrió un error al procesar la imagen."
          });
        case 17:
          // eliminar el archivo subido
          _fs["default"].unlinkSync(req.file.path);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 13]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// ruta para subir multiples imagenes y guardarla en tres tamaños diferentes (Max. 5 Archivos)
app.post("/api/images/multiple", verifyToken, uploadMultiple.array("image", 5), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var filenames, _iterator, _step, file;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!req.files || req.files.length === 0)) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", res.status(400).send("No se han enviado archivos."));
        case 2:
          // Procesar archivos y crear versiones en diferentes tamaños
          filenames = req.files.map(function (file) {
            return file.filename;
          });
          _context2.prev = 3;
          _iterator = _createForOfIteratorHelper(req.files);
          _context2.prev = 5;
          _iterator.s();
        case 7:
          if ((_step = _iterator.n()).done) {
            _context2.next = 18;
            break;
          }
          file = _step.value;
          _context2.next = 11;
          return (0, _sharp["default"])(file.path).jpeg({
            quality: 80
          }).toFile("uploads/".concat(file.filename, "-original.jpg"));
        case 11:
          _context2.next = 13;
          return (0, _sharp["default"])(file.path).resize({
            width: 640
          }).jpeg({
            quality: 80
          }).toFile("uploads/".concat(file.filename, "-medium.jpg"));
        case 13:
          _context2.next = 15;
          return (0, _sharp["default"])(file.path).resize({
            width: 160
          }).jpeg({
            quality: 80
          }).toFile("uploads/".concat(file.filename, "-thumb.jpg"));
        case 15:
          // eliminar el archivo subido
          _fs["default"].unlinkSync(file.path);
        case 16:
          _context2.next = 7;
          break;
        case 18:
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](5);
          _iterator.e(_context2.t0);
        case 23:
          _context2.prev = 23;
          _iterator.f();
          return _context2.finish(23);
        case 26:
          // responder con un mensaje de éxito
          res.json({
            message: "Las imágenes se han subido y procesado correctamente.",
            filenames: filenames
          });
          _context2.next = 33;
          break;
        case 29:
          _context2.prev = 29;
          _context2.t1 = _context2["catch"](3);
          // responder con un error si ocurre algún problema
          console.error(_context2.t1);
          res.status(500).json({
            message: "Ocurrió un error al procesar las imágenes."
          });
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 29], [5, 20, 23, 26]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// ruta para subir multiples documentos (Max. 8 Archivos)
app.post("/api/documents/multiple", verifyToken, uploadMultiple.array("documents", 8), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var filenames, _iterator2, _step2, file;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(!req.files || req.files.length === 0)) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return", res.status(400).send("No se han enviado archivos."));
        case 2:
          // Procesar archivos y crear versiones en diferentes tamaños
          filenames = req.files.map(function (file) {
            return file.filename;
          });
          _context3.prev = 3;
          _iterator2 = _createForOfIteratorHelper(req.files);
          _context3.prev = 5;
          _iterator2.s();
        case 7:
          if ((_step2 = _iterator2.n()).done) {
            _context3.next = 18;
            break;
          }
          file = _step2.value;
          _context3.next = 11;
          return (0, _sharp["default"])(file.path).jpeg({
            quality: 80
          }).toFile("uploads/".concat(file.filename, "-original.jpg"));
        case 11:
          _context3.next = 13;
          return (0, _sharp["default"])(file.path).resize({
            width: 640
          }).jpeg({
            quality: 80
          }).toFile("uploads/".concat(file.filename, "-medium.jpg"));
        case 13:
          _context3.next = 15;
          return (0, _sharp["default"])(file.path).resize({
            width: 160
          }).jpeg({
            quality: 80
          }).toFile("uploads/".concat(file.filename, "-thumb.jpg"));
        case 15:
          // eliminar el archivo subido
          _fs["default"].unlinkSync(file.path);
        case 16:
          _context3.next = 7;
          break;
        case 18:
          _context3.next = 23;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](5);
          _iterator2.e(_context3.t0);
        case 23:
          _context3.prev = 23;
          _iterator2.f();
          return _context3.finish(23);
        case 26:
          // responder con un mensaje de éxito
          res.json({
            message: "Las imágenes se han subido y procesado correctamente.",
            filenames: filenames
          });
          _context3.next = 33;
          break;
        case 29:
          _context3.prev = 29;
          _context3.t1 = _context3["catch"](3);
          // responder con un error si ocurre algún problema
          console.error(_context3.t1);
          res.status(500).json({
            message: "Ocurrió un error al procesar las imágenes."
          });
        case 33:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 29], [5, 20, 23, 26]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// ruta para obtener una imagen en un tamaño específico
app.get("/api/images/:id", verifyToken, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, _req$query$size, size, sizes, imagePath, image;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$query$size = req.query.size, size = _req$query$size === void 0 ? "original" : _req$query$size; // verificar que el tamaño solicitado sea uno de los tamaños válidos
          sizes = ["original", "medium", "thumb"];
          if (sizes.includes(size)) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "El tamaño solicitado no es válido."
          }));
        case 5:
          try {
            // leer la imagen del tamaño solicitado
            imagePath = "uploads/".concat(id, "-").concat(size, ".jpg");
            image = _fs["default"].readFileSync(imagePath); // enviar la imagen como respuesta
            res.contentType("image/jpeg");
            res.end(image, "binary");
          } catch (err) {
            // responder con un error si la imagen no existe
            console.error(err);
            res.status(404).json({
              message: "La imagen solicitada no existe."
            });
          }
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// verificación de ruta no encontrada
app.use(function (req, res, next) {
  res.status(404).json({
    message: "Ruta no encontrada"
  });
});

// iniciar el servidor
app.listen(3000, function () {
  console.log("Servidor iniciado en el puerto 3000.");
});
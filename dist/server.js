"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _multer = _interopRequireDefault(require("multer"));
var _fs = _interopRequireDefault(require("fs"));
var _url = require("url");
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var PORT = process.env.PORT || 2000;
var _dirname = new _url.URL(".", import.meta.url).pathname;

// Storage de Multer
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var _req$params = req.params,
      typeUser = _req$params.typeUser,
      codeUser = _req$params.codeUser,
      typeFile = _req$params.typeFile,
      subFolder = _req$params.subFolder;
    var dir = subFolder && subFolder !== "" ? _path["default"].join(_dirname, "uploads/".concat(typeUser, "/").concat(codeUser, "/").concat(typeFile, "/").concat(subFolder)) : _path["default"].join(_dirname, "uploads/".concat(typeUser, "/").concat(codeUser, "/").concat(typeFile));
    var exist = _fs["default"].existsSync(dir);
    if (!exist) {
      _fs["default"].mkdirSync(dir, {
        recursive: true
      });
    }
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    var fileName = file.originalname;
    cb(null, fileName);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});
var app = (0, _express["default"])();

// Cors
app.use((0, _cors["default"])({
  origin: "*",
  methods: ["DELETE", "OPTIONS", "GET", "POST"]
}));

// Middleware para analizar el cuerpo de la solicitud
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.post("/api/upload/:typeUser/:codeUser/:typeFile/:subFolder?", upload.single("file"), function (req, res) {
  var file = req.file;
  // Verificar si se ha enviado un archivo
  if (!file) {
    return res.status(400).send("No se ha enviado un archivo.");
  }
  // Archivo guardado en folder según params
  //enviar los nombres en respuesta
  //retornar el nombre del archivo para guardar en la base de datos
  res.status(200).send(file);
});

// Ruta para subir múltiples archivos
app.post("/api/uploads/:typeUser/:codeUser/:typeFile/:subFolder?", upload.array("files", 10), function (req, res) {
  var files = req.files; // Array de archivos subidos

  // Verificar si se han enviado archivos
  if (!files || files.length === 0) {
    return res.status(400).send("No se han enviado archivos.");
  }

  // Si hay más de 10 archivos, devolver un error
  if (files.length > 10) {
    return res.status(400).send("El número máximo de archivos permitidos es 10.");
  }

  // Enviar los nombres de los archivos como respuesta
  var fileNames = files.map(function (file) {
    return file.filename;
  });
  res.status(200).json({
    message: "Archivos subidos correctamente",
    files: fileNames
  });
});
app["delete"]("/api/delete/:typeUser/:codeUser/:typeFile/:subFolder?/:id", function (req, res, next) {
  var _req$params2 = req.params,
    typeUser = _req$params2.typeUser,
    codeUser = _req$params2.codeUser,
    typeFile = _req$params2.typeFile,
    subFolder = _req$params2.subFolder,
    id = _req$params2.id;
  var filePath = subFolder && subFolder !== "" ? _path["default"].join(_dirname, "uploads/".concat(typeUser, "/").concat(codeUser, "/").concat(typeFile, "/").concat(subFolder, "/").concat(id)) : _path["default"].join(_dirname, "uploads/".concat(typeUser, "/").concat(codeUser, "/").concat(typeFile, "/").concat(id));
  http: _fs["default"].unlink(filePath, function (err) {
    if (err) {
      // manejar el error
      console.error(err);
      res.status(404).json({
        message: "Archivo no encontrado"
      });
      return false;
    }
    res.json({
      message: "Archivo eliminado"
    });
  });
});
app.post("/api/duplicate/:typeUser/:codeUser/:typeFile/:subFolder/:newSubFolder", function (req, res) {
  var _req$params3 = req.params,
    typeUser = _req$params3.typeUser,
    codeUser = _req$params3.codeUser,
    typeFile = _req$params3.typeFile,
    subFolder = _req$params3.subFolder,
    newSubFolder = _req$params3.newSubFolder;

  // Ruta del subfolder original
  var sourceDir = _path["default"].join(_dirname, "uploads/".concat(typeUser, "/").concat(codeUser, "/").concat(typeFile, "/").concat(subFolder));

  // Verificar si el subfolder original existe
  if (!_fs["default"].existsSync(sourceDir)) {
    return res.status(404).json({
      message: "El subfolder no existe."
    });
  }

  // Crear un nuevo nombre para el subfolder duplicado (puedes personalizar esto)
  var destinationDir = _path["default"].join(_dirname, "uploads/".concat(typeUser, "/").concat(codeUser, "/").concat(typeFile, "/").concat(newSubFolder));

  // Verificar si el nuevo subfolder ya existe
  if (_fs["default"].existsSync(destinationDir)) {
    return res.status(400).json({
      message: "El subfolder duplicado ya existe."
    });
  }
  try {
    // Copiar el contenido del subfolder original al nuevo subfolder
    _fs["default"].cpSync(sourceDir, destinationDir, {
      recursive: true
    });

    // Respuesta exitosa
    res.status(200).json({
      message: "Subfolder duplicado correctamente.",
      newSubFolder: newSubFolder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al duplicar el subfolder."
    });
  }
});

// ruta para obtener una imagen en un tamaño específico
app.get("/api/files/:typeUser/:codeUser/:typeFile/:subFolder?/:id/:name?", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$params4, typeUser, codeUser, typeFile, subFolder, id, _req$query$size, size, sizes, filePath, file;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$params4 = req.params, typeUser = _req$params4.typeUser, codeUser = _req$params4.codeUser, typeFile = _req$params4.typeFile, subFolder = _req$params4.subFolder, id = _req$params4.id;
          _req$query$size = req.query.size, size = _req$query$size === void 0 ? "original" : _req$query$size; // verificar que el tamaño solicitado sea uno de los tamaños válidos
          sizes = ["original", "medium", "thumb"];
          if (sizes.includes(size)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "El tamaño solicitado no es válido."
          }));
        case 5:
          _context.prev = 5;
          if (!(id === "null" || id === null)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "La imagen solicitada no existe."
          }));
        case 8:
          // leer la imagen del tamaño solicitado
          filePath = subFolder && subFolder !== "" ? _path["default"].join(_dirname, "uploads/".concat(typeUser, "/").concat(codeUser, "/").concat(typeFile, "/").concat(subFolder, "/").concat(id)) : _path["default"].join(_dirname, "uploads/".concat(typeUser, "/").concat(codeUser, "/").concat(typeFile, "/").concat(id));
          file = _fs["default"].readFileSync(filePath); //PRIORITARIO validar el tipo de archivo para codificar el res con el tipo de archivo
          // enviar la imagen como respuesta
          //res.contentType("image/jpeg")
          res.send(file);
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](5);
          // responder con un error si la imagen no existe
          console.error(_context.t0);
          res.status(404).json({
            message: "La imagen solicitada no existe."
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 13]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Ruta de ejemplo
app.post("/api/upload/avatar", upload.single("image"), function (req, res) {
  // Archivo guardado en folder según body
  res.status(200).json("fino");
});

// verificación de ruta no encontrada
app.use(function (req, res, next) {
  res.status(404).json({
    message: "Ruta no encontrada"
  });
});
app.listen(PORT, function () {
  console.log("Servidor iniciado en el puerto ".concat(PORT, "."));
});
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.injectHashIntoFilename = exports.convertToIco = exports.resizeImage = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var resizeImage = exports.resizeImage = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(source, target, width, height, backgroundColor) {
        var sourceImg;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _jimp2.default.read(source);

                    case 2:
                        sourceImg = _context.sent;
                        return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                            try {
                                if (backgroundColor) {
                                    sourceImg.background(hexColorToInt(backgroundColor));
                                }
                                sourceImg.contain(width, height, _jimp2.default.HORIZONTAL_ALIGN_CENTER | _jimp2.default.VERTICAL_ALIGN_MIDDLE).write(target, function () {
                                    return resolve(target);
                                });
                            } catch (error) {
                                reject(error);
                            }
                        }));

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function resizeImage(_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
    };
}();

var convertToIco = exports.convertToIco = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(sources, target) {
        var buf;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _toIco2.default)(sources.map(function (s) {
                            return _fs2.default.readFileSync(s);
                        }));

                    case 2:
                        buf = _context2.sent;

                        _fs2.default.writeFileSync(target, buf);
                        return _context2.abrupt('return', target);

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function convertToIco(_x7, _x8) {
        return _ref2.apply(this, arguments);
    };
}();

var injectHashIntoFilename = exports.injectHashIntoFilename = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(filename, file) {
        var hash;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!(filename.indexOf('[hash]') > -1)) {
                            _context3.next = 7;
                            break;
                        }

                        _context3.next = 3;
                        return _hasha2.default.fromFile(file, { algorithm: 'sha256' });

                    case 3:
                        hash = _context3.sent;
                        return _context3.abrupt('return', filename.replace('[hash]', hash));

                    case 7:
                        return _context3.abrupt('return', filename);

                    case 8:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function injectHashIntoFilename(_x9, _x10) {
        return _ref3.apply(this, arguments);
    };
}();

exports.hexColorToInt = hexColorToInt;
exports.addFileToAssets = addFileToAssets;
exports.generateLinkElement = generateLinkElement;
exports.generateSizeMap = generateSizeMap;
exports.generateMetaElement = generateMetaElement;
exports.writeFile = writeFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _toIco = require('to-ico');

var _toIco2 = _interopRequireDefault(_toIco);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _hasha = require('hasha');

var _hasha2 = _interopRequireDefault(_hasha);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hexColorToInt() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (typeof val === 'number') {
        return Number(val);
    }

    var color = new _tinycolor2.default(val);
    return parseInt(color.toHex8(), 16);
}

function addFileToAssets(filename, path, compilation) {
    try {
        var _fs$statSync = _fs2.default.statSync(filename),
            _size = _fs$statSync.size;

        var _source = _fs2.default.readFileSync(filename);
        var basename = filename.replace(path + '/', '');

        compilation.fileDependencies.push(filename);
        compilation.assets[basename] = {
            source: function source() {
                return _source;
            },
            size: function size() {
                return _size;
            }
        };
    } catch (error) {
        return _promise2.default.reject(new Error('HiveHomeFaviconsWebpackPlugin: could not load file ' + filename));
    }
}

function generateLinkElement(attrs) {
    var attrStr = (0, _entries2.default)(attrs).map(function (_ref4) {
        var _ref5 = (0, _slicedToArray3.default)(_ref4, 2),
            key = _ref5[0],
            value = _ref5[1];

        return key + '="' + value + '"';
    }).join(' ');
    return '<link ' + attrStr + '>';
}

function generateSizeMap(sizes, baseName, path, publicPath, outputPrefix) {
    return sizes.map(function (_ref6) {
        var width = _ref6.width,
            height = _ref6.height;
        return {
            width: width,
            height: height,
            publicPath: '' + publicPath + outputPrefix + baseName + '-' + width + 'x' + height + '.png',
            path: path + '/' + outputPrefix + baseName + '-' + width + 'x' + height + '.png'
        };
    });
}

function generateMetaElement(name, content) {
    return '<meta name="' + name + '" content="' + content + '">';
}

function writeFile(filename, contents) {
    _fs2.default.writeFileSync(filename, contents);
    return;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2, _ref3) {
        var title = _ref2.title,
            prefix = _ref2.prefix,
            source = _ref2.source;
        var path = _ref3.path,
            publicPath = _ref3.publicPath;
        var outputPrefix, sizes, iconPngs, faviconFilename;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.injectHashIntoFilename)(prefix, source);

                    case 2:
                        outputPrefix = _context.sent;
                        sizes = [16, 32, 64];
                        _context.next = 6;
                        return _promise2.default.all(sizes.map(function (size) {
                            return (0, _utils.resizeImage)(source, path + '/' + outputPrefix + 'favicon-' + size + 'x' + size + '.png', size, size);
                        }));

                    case 6:
                        iconPngs = _context.sent;
                        faviconFilename = outputPrefix + 'favicon.ico';
                        _context.next = 10;
                        return (0, _utils.convertToIco)(iconPngs, path + '/' + faviconFilename);

                    case 10:
                        return _context.abrupt('return', {
                            html: '\n          <link rel="icon" type="image/x-icon" href="' + publicPath + faviconFilename + '">\n          <link rel="shortcut icon" type="image/x-icon" href="' + publicPath + faviconFilename + '">\n          ' + sizes.map(function (s) {
                                return '<link rel="icon" type="image/x-icon" type="image/png" ' + ('sizes="' + s + 'x' + s + '" href="' + publicPath + outputPrefix + 'favicon-' + s + 'x' + s + '.png">');
                            }).join('') + '\n        ',
                            files: [path + '/' + faviconFilename].concat((0, _toConsumableArray3.default)(sizes.map(function (s) {
                                return path + '/' + outputPrefix + 'favicon-' + s + 'x' + s + '.png';
                            })))
                        });

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
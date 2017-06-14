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

var IMAGE_SIZES = [{ width: 16, height: 16 }, { width: 24, height: 24 }, { width: 32, height: 32 }, { width: 48, height: 48 }, { width: 64, height: 64 }];

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2, _ref3) {
        var title = _ref2.title,
            prefix = _ref2.prefix,
            source = _ref2.source;
        var path = _ref3.path,
            publicPath = _ref3.publicPath;
        var outputPrefix, faviconFilename, faviconPublic, sizes, iconPngs, linkElements;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.injectHashIntoFilename)(prefix, source);

                    case 2:
                        outputPrefix = _context.sent;
                        faviconFilename = outputPrefix + 'favicon.ico';
                        faviconPublic = '' + publicPath + faviconFilename;
                        sizes = (0, _utils.generateSizeMap)(IMAGE_SIZES, 'favicon', path, publicPath, outputPrefix);
                        _context.next = 8;
                        return _promise2.default.all(sizes.map(function (_ref4) {
                            var width = _ref4.width,
                                height = _ref4.height,
                                path = _ref4.path;
                            return (0, _utils.resizeImage)(source, path, width, height);
                        }));

                    case 8:
                        iconPngs = _context.sent;
                        _context.next = 11;
                        return (0, _utils.convertToIco)(iconPngs, path + '/' + faviconFilename);

                    case 11:
                        linkElements = [(0, _utils.generateLinkElement)({ rel: 'icon', type: 'image/x-icon', href: faviconPublic }), (0, _utils.generateLinkElement)({ rel: 'shortcut icon', type: 'image/x-icon', href: faviconPublic })].concat((0, _toConsumableArray3.default)(sizes.map(function (_ref5) {
                            var publicPath = _ref5.publicPath;
                            return (0, _utils.generateLinkElement)({ rel: 'icon', type: 'image/png', href: publicPath });
                        })));
                        return _context.abrupt('return', {
                            html: linkElements.join('\n'),
                            files: [path + '/' + faviconFilename].concat((0, _toConsumableArray3.default)(sizes.map(function (_ref6) {
                                var path = _ref6.path;
                                return path;
                            })))
                        });

                    case 13:
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
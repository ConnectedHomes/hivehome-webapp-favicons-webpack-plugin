'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IMAGE_SIZES = [{ width: 57, height: 57 }, { width: 60, height: 60 }, { width: 72, height: 72 }, { width: 76, height: 76 }, { width: 114, height: 114 }, { width: 120, height: 120 }, { width: 144, height: 144 }, { width: 152, height: 152 }, { width: 180, height: 180 }];

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2, _ref3) {
        var title = _ref2.title,
            prefix = _ref2.prefix,
            source = _ref2.source,
            statusBar = _ref2.statusBar;
        var path = _ref3.path,
            publicPath = _ref3.publicPath;
        var outputPrefix, sizes, linkElements;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.injectHashIntoFilename)(prefix, source);

                    case 2:
                        outputPrefix = _context.sent;
                        sizes = (0, _utils.generateSizeMap)(IMAGE_SIZES, 'apple-touch-icon', path, publicPath, outputPrefix);
                        _context.next = 6;
                        return _promise2.default.all(sizes.map(function (_ref4) {
                            var path = _ref4.path,
                                width = _ref4.width,
                                height = _ref4.height;
                            return (0, _utils.resizeImage)(source, path, width, height);
                        }));

                    case 6:
                        linkElements = sizes.map(function (_ref5) {
                            var width = _ref5.width,
                                height = _ref5.height,
                                publicPath = _ref5.publicPath;
                            return (0, _utils.generateLinkElement)({
                                rel: 'apple-touch-icon',
                                type: 'image/x-icon',
                                sizes: width + 'x' + height,
                                href: publicPath
                            });
                        });


                        linkElements.push((0, _utils.generateMetaElement)('apple-mobile-web-app-capable', 'yes'));
                        linkElements.push((0, _utils.generateMetaElement)('apple-mobile-web-app-title', title));

                        if (statusBar) {
                            linkElements.push((0, _utils.generateMetaElement)('apple-mobile-web-app-status-bar-style', statusBar));
                        }

                        return _context.abrupt('return', {
                            html: linkElements.join('\n'),
                            files: sizes.map(function (_ref6) {
                                var path = _ref6.path;
                                return path;
                            })
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
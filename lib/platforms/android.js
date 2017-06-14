'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IMAGE_SIZES = [{ width: 36, height: 36 }, { width: 46, height: 46 }, { width: 72, height: 72 }, { width: 96, height: 96 }, { width: 144, height: 144 }, { width: 192, height: 192 }, { width: 256, height: 256 }, { width: 384, height: 384 }, { width: 512, height: 512 }];

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2, _ref3) {
        var title = _ref2.title,
            prefix = _ref2.prefix,
            source = _ref2.source,
            themeColor = _ref2.themeColor,
            backgroundColor = _ref2.backgroundColor;
        var path = _ref3.path,
            publicPath = _ref3.publicPath;
        var outputPrefix, outputFilename, manifestPath, manifestPublic, sizes, manifest, linkElements;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.injectHashIntoFilename)(prefix, source);

                    case 2:
                        outputPrefix = _context.sent;
                        outputFilename = outputPrefix + 'manifest.json';
                        manifestPath = path + '/' + outputFilename;
                        manifestPublic = '' + publicPath + outputFilename;
                        sizes = (0, _utils.generateSizeMap)(IMAGE_SIZES, 'android-chrome', path, publicPath, outputPrefix);
                        _context.next = 9;
                        return _promise2.default.all(sizes.map(function (_ref4) {
                            var path = _ref4.path,
                                width = _ref4.width,
                                height = _ref4.height;
                            return (0, _utils.resizeImage)(source, path, width, height);
                        }));

                    case 9:
                        manifest = generateManifest(title, sizes, themeColor, backgroundColor);

                        (0, _utils.writeFile)(manifestPath, (0, _stringify2.default)(manifest, null, '\t'));

                        linkElements = [(0, _utils.generateLinkElement)({ rel: 'manifest', href: manifestPublic }), (0, _utils.generateMetaElement)('mobile-web-app-capable', 'yes'), (0, _utils.generateMetaElement)('apple-mobile-web-app-title', title)];

                        if (themeColor) {
                            linkElements.push((0, _utils.generateMetaElement)('theme-color', themeColor));
                        }

                        return _context.abrupt('return', {
                            html: linkElements.join('\n'),
                            files: [manifestPath].concat((0, _toConsumableArray3.default)(sizes.map(function (_ref5) {
                                var path = _ref5.path;
                                return path;
                            })))
                        });

                    case 14:
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

function generateManifest(title, sizes, themeColor, backgroundColor) {
    return {
        name: title,
        short_name: title,
        description: title,
        dir: 'auto',
        lang: 'en-GB',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './?utm_source=web_app_manifest',
        background_color: backgroundColor,
        theme_color: themeColor,
        icons: sizes.map(function (_ref6) {
            var width = _ref6.width,
                height = _ref6.height,
                publicPath = _ref6.publicPath;
            return {
                src: publicPath,
                sizes: width + 'x' + height,
                type: 'image/png'
            };
        })
    };
}
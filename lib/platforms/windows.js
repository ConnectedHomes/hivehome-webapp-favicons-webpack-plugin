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

var IMAGE_SIZES = [{ width: 128, height: 128 }, { width: 144, height: 144 }, { width: 270, height: 270 }, { width: 558, height: 270 }, { width: 558, height: 558 }];

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2, _ref3) {
        var title = _ref2.title,
            prefix = _ref2.prefix,
            source = _ref2.source,
            tileColor = _ref2.tileColor;
        var path = _ref3.path,
            publicPath = _ref3.publicPath;
        var outputPrefix, outputFilename, browserConfigPath, browserConfigPublic, sizes, browserConfig, linkElements;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.injectHashIntoFilename)(prefix, source);

                    case 2:
                        outputPrefix = _context.sent;
                        outputFilename = outputPrefix + 'browserconfig.xml';
                        browserConfigPath = path + '/' + outputFilename;
                        browserConfigPublic = '' + publicPath + outputFilename;
                        sizes = (0, _utils.generateSizeMap)(IMAGE_SIZES, 'mstile', path, publicPath, outputPrefix);
                        _context.next = 9;
                        return _promise2.default.all(sizes.map(function (_ref4) {
                            var path = _ref4.path,
                                width = _ref4.width,
                                height = _ref4.height;
                            return (0, _utils.resizeImage)(source, path, width, height);
                        }));

                    case 9:
                        browserConfig = generateBrowserConfig(title, sizes, tileColor);

                        (0, _utils.writeFile)(browserConfigPath, browserConfig);

                        linkElements = [(0, _utils.generateMetaElement)('msapplication-TileImage', '' + publicPath + outputPrefix + 'mstile-144x144.png'), (0, _utils.generateMetaElement)('msapplication-config', browserConfigPublic)];


                        if (tileColor) {
                            linkElements.push((0, _utils.generateMetaElement)('msapplication-TileColor', tileColor));
                        }

                        return _context.abrupt('return', {
                            html: linkElements.join('\n'),
                            files: [browserConfigPath].concat((0, _toConsumableArray3.default)(sizes.map(function (_ref5) {
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

function generateBrowserConfig(title, sizes, tileColor) {
    return '<?xml version="1.0" encoding="utf-8"?>\n    <browserconfig>\n        <msapplication>\n            <tile>\n                <square70x70logo src="' + sizes[0].publicPath + '"/>\n                <square150x150logo src="' + sizes[2].publicPath + '"/>\n                <wide310x150logo src="' + sizes[3].publicPath + '"/>\n                <square310x310logo src="' + sizes[4].publicPath + '"/>\n                <TileColor>' + tileColor + '</TileColor>\n            </tile>\n        </msapplication>\n    </browserconfig>';
}
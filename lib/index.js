'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _platforms = require('./platforms');

var _platforms2 = _interopRequireDefault(_platforms);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HiveHomeFaviconsWebpackPlugin(options) {
    (0, _assert2.default)((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object', 'HiveHomeFaviconsWebpackPlugin options are required');
    (0, _assert2.default)(options.platforms && (0, _keys2.default)(options.platforms).length, 'options.platforms must exist and contain at least one target platform');
    (0, _assert2.default)(options.prefix, 'options.prefix must be set');
    (0, _assert2.default)(options.title, 'options.title must be set');

    this.options = options;
}

HiveHomeFaviconsWebpackPlugin.prototype.apply = function (compiler) {
    var self = this;
    var faviconHTML = void 0;
    var files = void 0;

    compiler.plugin('make', function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(compilation, callback) {
            var _self$options, title, prefix, configs, results;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _self$options = self.options, title = _self$options.title, prefix = _self$options.prefix;
                            configs = (0, _entries2.default)(self.options.platforms);
                            _context.next = 5;
                            return _promise2.default.all(configs.map(function (_ref2) {
                                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
                                    platform = _ref3[0],
                                    config = _ref3[1];

                                return _platforms2.default[platform] && _platforms2.default[platform]((0, _extends3.default)({ title: title, prefix: prefix }, config), compilation.outputOptions);
                            }));

                        case 5:
                            results = _context.sent;


                            files = results.reduce(function (a, r) {
                                return [].concat((0, _toConsumableArray3.default)(a), (0, _toConsumableArray3.default)(r.files));
                            }, []);
                            faviconHTML = results.reduce(function (a, r) {
                                return a + r.html;
                            }, '');

                            callback();
                            _context.next = 14;
                            break;

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context['catch'](0);

                            callback(_context.t0);

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 11]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(htmlPluginData, callback) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return _promise2.default.all(files.map(function (f) {
                                    return (0, _utils.addFileToAssets)(f, compilation.outputOptions.path, compilation);
                                }));

                            case 3:
                                console.log(compilation.assets);
                                htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/i, faviconHTML + '$&');
                                callback(null, htmlPluginData);
                                _context2.next = 12;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](0);

                                console.log('compile-error', _context2.t0);
                                callback(_context2.t0);

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 8]]);
            }));

            return function (_x3, _x4) {
                return _ref4.apply(this, arguments);
            };
        }());
    });
};

module.exports = HiveHomeFaviconsWebpackPlugin;
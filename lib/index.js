'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _platforms = require('./platforms');

var _platforms2 = _interopRequireDefault(_platforms);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function HiveHomeFaviconsWebpackPlugin(options) {
    (0, _assert2.default)(typeof options === 'object', 'HiveHomeFaviconsWebpackPlugin options are required');
    (0, _assert2.default)(options.platforms && Object.keys(options.platforms).length, 'options.platforms must exist and contain at least one target platform');
    (0, _assert2.default)(options.prefix, 'options.prefix must be set');
    (0, _assert2.default)(options.title, 'options.title must be set');

    this.options = options;
}

HiveHomeFaviconsWebpackPlugin.prototype.apply = function (compiler) {
    const self = this;
    let faviconHTML;
    let files;

    compiler.plugin('make', (() => {
        var _ref = _asyncToGenerator(function* (compilation, callback) {
            try {
                var _self$options = self.options;
                const title = _self$options.title,
                      prefix = _self$options.prefix;

                const configs = Object.entries(self.options.platforms);

                const results = yield Promise.all(configs.map(function ([platform, config]) {
                    return _platforms2.default[platform] && _platforms2.default[platform](_extends({ title, prefix }, config), compilation.outputOptions);
                }));

                files = results.reduce(function (a, r) {
                    return [...a, ...r.files];
                }, []);
                faviconHTML = results.reduce(function (a, r) {
                    return `${a}${r.html}\n`;
                }, '');
                callback();
            } catch (error) {
                callback(error);
            }
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })());

    compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-before-html-processing', (() => {
            var _ref2 = _asyncToGenerator(function* (htmlPluginData, callback) {
                try {
                    yield Promise.all(files.map(function (f) {
                        return (0, _utils.addFileToAssets)(f, compilation.outputOptions.path, compilation);
                    }));
                    htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/i, faviconHTML + '$&');
                    callback(null, htmlPluginData);
                } catch (error) {
                    callback(error);
                }
            });

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        })());
    });
};

module.exports = HiveHomeFaviconsWebpackPlugin;
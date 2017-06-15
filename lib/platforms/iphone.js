'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const IMAGE_SIZES = [{ width: 57, height: 57 }, { width: 60, height: 60 }, { width: 72, height: 72 }, { width: 76, height: 76 }, { width: 114, height: 114 }, { width: 120, height: 120 }, { width: 144, height: 144 }, { width: 152, height: 152 }, { width: 180, height: 180 }];

exports.default = (() => {
    var _ref = _asyncToGenerator(function* ({ title, prefix, source, statusBar }, { path, publicPath }) {
        const outputPrefix = yield (0, _utils.injectHashIntoFilename)(prefix, source);
        const sizes = (0, _utils.generateSizeMap)(IMAGE_SIZES, 'apple-touch-icon', path, publicPath, outputPrefix);
        yield Promise.all(sizes.map(function ({ path, width, height }) {
            return (0, _utils.resizeImage)(source, path, width, height);
        }));

        const linkElements = sizes.map(function ({ width, height, publicPath }) {
            return (0, _utils.generateLinkElement)({
                rel: 'apple-touch-icon',
                type: 'image/x-icon',
                sizes: `${width}x${height}`,
                href: publicPath
            });
        });

        linkElements.push((0, _utils.generateMetaElement)('apple-mobile-web-app-capable', 'yes'));
        linkElements.push((0, _utils.generateMetaElement)('apple-mobile-web-app-title', title));

        if (statusBar) {
            linkElements.push((0, _utils.generateMetaElement)('apple-mobile-web-app-status-bar-style', statusBar));
        }

        return {
            html: linkElements.join('\n'),
            files: sizes.map(function ({ path }) {
                return path;
            })
        };
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();
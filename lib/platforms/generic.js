'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const IMAGE_SIZES = [{ width: 16, height: 16 }, { width: 24, height: 24 }, { width: 32, height: 32 }, { width: 48, height: 48 }, { width: 64, height: 64 }];

exports.default = (() => {
    var _ref = _asyncToGenerator(function* ({ title, prefix, source }, { path, publicPath }) {
        const outputPrefix = yield (0, _utils.injectHashIntoFilename)(prefix, source);
        const faviconFilename = `${outputPrefix}favicon.ico`;
        const faviconPublic = `${publicPath}${faviconFilename}`;

        const sizes = (0, _utils.generateSizeMap)(IMAGE_SIZES, 'favicon', path, publicPath, outputPrefix);
        const iconPngs = yield Promise.all(sizes.map(function ({ width, height, path }) {
            return (0, _utils.resizeImage)(source, path, width, height);
        }));
        yield (0, _utils.convertToIco)(iconPngs, `${path}/${faviconFilename}`);

        const linkElements = [(0, _utils.generateLinkElement)({ rel: 'icon', type: 'image/x-icon', href: faviconPublic }), (0, _utils.generateLinkElement)({ rel: 'shortcut icon', type: 'image/x-icon', href: faviconPublic }), ...sizes.map(function ({ publicPath }) {
            return (0, _utils.generateLinkElement)({ rel: 'icon', type: 'image/png', href: publicPath });
        })];

        return {
            html: linkElements.join('\n'),
            files: [`${path}/${faviconFilename}`, ...sizes.map(function ({ path }) {
                return path;
            })]
        };
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();
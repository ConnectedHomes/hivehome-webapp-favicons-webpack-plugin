'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const IMAGE_SIZES = [{ width: 36, height: 36 }, { width: 46, height: 46 }, { width: 72, height: 72 }, { width: 96, height: 96 }, { width: 144, height: 144 }, { width: 192, height: 192 }, { width: 256, height: 256 }, { width: 384, height: 384 }, { width: 512, height: 512 }];

exports.default = (() => {
    var _ref = _asyncToGenerator(function* ({ title, prefix, source, themeColor, backgroundColor }, { path, publicPath }) {
        const outputPrefix = yield (0, _utils.injectHashIntoFilename)(prefix, source);
        const outputFilename = `${outputPrefix}manifest.json`;
        const manifestPath = `${path}/${outputFilename}`;
        const manifestPublic = `${publicPath}${outputFilename}`;

        const sizes = (0, _utils.generateSizeMap)(IMAGE_SIZES, 'android-chrome', path, publicPath, outputPrefix);
        yield Promise.all(sizes.map(function ({ path, width, height }) {
            return (0, _utils.resizeImage)(source, path, width, height);
        }));

        const manifest = generateManifest(title, sizes, themeColor, backgroundColor);
        (0, _utils.writeFile)(manifestPath, JSON.stringify(manifest, null, '\t'));

        const linkElements = [(0, _utils.generateLinkElement)({ rel: 'manifest', href: manifestPublic }), (0, _utils.generateMetaElement)('mobile-web-app-capable', 'yes'), (0, _utils.generateMetaElement)('apple-mobile-web-app-title', title)];
        if (themeColor) {
            linkElements.push((0, _utils.generateMetaElement)('theme-color', themeColor));
        }

        return {
            html: linkElements.join('\n'),
            files: [manifestPath, ...sizes.map(function ({ path }) {
                return path;
            })]
        };
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

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
        icons: sizes.map(({ width, height, publicPath }) => ({
            src: publicPath,
            sizes: `${width}x${height}`,
            type: 'image/png'
        }))
    };
}
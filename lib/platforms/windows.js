'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const IMAGE_SIZES = [{ width: 128, height: 128 }, { width: 144, height: 144 }, { width: 270, height: 270 }, { width: 558, height: 270 }, { width: 558, height: 558 }];

exports.default = (() => {
    var _ref = _asyncToGenerator(function* ({ title, prefix, source, tileColor }, { path, publicPath }) {
        const outputPrefix = yield (0, _utils.injectHashIntoFilename)(prefix, source);
        const outputFilename = `${outputPrefix}browserconfig.xml`;
        const browserConfigPath = `${path}/${outputFilename}`;
        const browserConfigPublic = `${publicPath}${outputFilename}`;

        const sizes = (0, _utils.generateSizeMap)(IMAGE_SIZES, 'mstile', path, publicPath, outputPrefix);
        yield Promise.all(sizes.map(function ({ path, width, height }) {
            return (0, _utils.resizeImage)(source, path, width, height, tileColor);
        }));

        const browserConfig = generateBrowserConfig(title, sizes, tileColor);
        (0, _utils.writeFile)(browserConfigPath, browserConfig);

        const linkElements = [(0, _utils.generateMetaElement)('msapplication-TileImage', `${publicPath}${outputPrefix}mstile-144x144.png`), (0, _utils.generateMetaElement)('msapplication-config', browserConfigPublic)];

        if (tileColor) {
            linkElements.push((0, _utils.generateMetaElement)('msapplication-TileColor', tileColor));
        }

        return {
            html: linkElements.join('\n'),
            files: [browserConfigPath, ...sizes.map(function ({ path }) {
                return path;
            })]
        };
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

function generateBrowserConfig(title, sizes, tileColor) {
    return `<?xml version="1.0" encoding="utf-8"?>
    <browserconfig>
        <msapplication>
            <tile>
                <square70x70logo src="${sizes[0].publicPath}"/>
                <square150x150logo src="${sizes[2].publicPath}"/>
                <wide310x150logo src="${sizes[3].publicPath}"/>
                <square310x310logo src="${sizes[4].publicPath}"/>
                <TileColor>${tileColor}</TileColor>
            </tile>
        </msapplication>
    </browserconfig>`;
}
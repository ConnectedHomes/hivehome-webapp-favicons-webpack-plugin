'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addFileToAssets = exports.injectHashIntoFilename = exports.convertToIco = exports.resizeImage = undefined;

let resizeImage = exports.resizeImage = (() => {
    var _ref = _asyncToGenerator(function* (source, target, width, height, backgroundColor) {
        const sourceImg = yield _jimp2.default.read(source);
        return new Promise(function (resolve, reject) {
            try {
                if (backgroundColor) {
                    sourceImg.background(hexColorToInt(backgroundColor));
                }
                sourceImg.contain(width, height, _jimp2.default.HORIZONTAL_ALIGN_CENTER | _jimp2.default.VERTICAL_ALIGN_MIDDLE).write(target, function () {
                    return resolve(target);
                });
            } catch (error) {
                reject(error);
            }
        });
    });

    return function resizeImage(_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
    };
})();

let convertToIco = exports.convertToIco = (() => {
    var _ref2 = _asyncToGenerator(function* (sources, target) {
        const buf = yield (0, _toIco2.default)(sources.map(function (s) {
            return _fs2.default.readFileSync(s);
        }));
        _fs2.default.writeFileSync(target, buf);
        return target;
    });

    return function convertToIco(_x6, _x7) {
        return _ref2.apply(this, arguments);
    };
})();

let injectHashIntoFilename = exports.injectHashIntoFilename = (() => {
    var _ref3 = _asyncToGenerator(function* (filename, file) {
        if (filename.indexOf('[hash]') > -1) {
            const hash = yield _hasha2.default.fromFile(file, { algorithm: 'sha256' });
            return filename.replace('[hash]', hash);
        } else {
            return filename;
        }
    });

    return function injectHashIntoFilename(_x8, _x9) {
        return _ref3.apply(this, arguments);
    };
})();

exports.hexColorToInt = hexColorToInt;
exports.generateLinkElement = generateLinkElement;
exports.generateSizeMap = generateSizeMap;
exports.generateMetaElement = generateMetaElement;
exports.writeFile = writeFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _toIco = require('to-ico');

var _toIco2 = _interopRequireDefault(_toIco);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _hasha = require('hasha');

var _hasha2 = _interopRequireDefault(_hasha);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function hexColorToInt(val = 0) {
    if (typeof val === 'number') {
        return Number(val);
    }

    const color = new _tinycolor2.default(val);
    return parseInt(color.toHex8(), 16);
}

function addFileToAssets(filename, path, compilation) {
    try {
        var _fs$statSync = _fs2.default.statSync(filename);

        const _size = _fs$statSync.size;

        const _source = _fs2.default.readFileSync(filename);
        const basename = filename.replace(`${path}/`, '');

        compilation.fileDependencies.push(filename);
        compilation.assets[basename] = {
            source: () => _source,
            size: () => _size
        };
    } catch (error) {
        return Promise.reject(new Error('HiveHomeFaviconsWebpackPlugin: could not load file ' + filename));
    }
}

exports.addFileToAssets = addFileToAssets;
function generateLinkElement(attrs) {
    const attrStr = Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(' ');
    return `<link ${attrStr}>`;
}

function generateSizeMap(sizes, baseName, path, publicPath, outputPrefix) {
    return sizes.map(({ width, height }) => ({
        width,
        height,
        publicPath: `${publicPath}${outputPrefix}${baseName}-${width}x${height}.png`,
        path: `${path}/${outputPrefix}${baseName}-${width}x${height}.png`
    }));
}

function generateMetaElement(name, content) {
    return `<meta name="${name}" content="${content}">`;
}

function writeFile(filename, contents) {
    _fs2.default.writeFileSync(filename, contents);
    return;
}
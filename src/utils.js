import fs from 'fs';
import toIco from 'to-ico';
import Jimp from 'jimp';
import md5File from 'md5-file/promise';
import TinyColor from 'tinycolor2';

export async function resizeImage(source, target, width, height, backgroundColor) {
    const sourceImg = await Jimp.read(source);
    return new Promise((resolve, reject) => {
        try {
            if (backgroundColor) {
                sourceImg.background(hexColorToInt(backgroundColor));
            }
            sourceImg
                .contain(width, height, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
                .write(target, () => resolve(target));
        } catch (error) {
            reject(error);
        }
    });
}

export function hexColorToInt(val = 0) {
    if (typeof val === 'number') {
        return Number(val);
    }

    const color = new TinyColor(val);
    return parseInt(color.toHex8(), 16);
}

export async function convertToIco(sources, target) {
    const buf = await toIco(sources.map(s => fs.readFileSync(s)));
    fs.writeFileSync(target, buf);
    return target;
}

export async function injectHashIntoFilename(filename, file) {
    if (filename.indexOf('[hash]') > -1) {
        const hash = await md5File(file);
        return filename.replace('[hash]', hash);
    } else {
        return filename;
    }
}

export function addFileToAssets(filename, path, compilation) {
    try {
        const { size } = fs.statSync(filename);
        const source = fs.readFileSync(filename);
        const basename = filename.replace(`${path}/`, '');

        compilation.fileDependencies.push(filename);
        compilation.assets[basename] = {
            source: () => source,
            size: () => size
        };
    } catch (error) {
        return Promise.reject(new Error('HiveHomeFaviconsWebpackPlugin: could not load file ' + filename));
    }
}

export function generateLinkElement(attrs) {
    const attrStr = Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(' ');
    return `<link ${attrStr}>`;
}

export function generateSizeMap(sizes, baseName, path, publicPath, outputPrefix) {
    return sizes.map(({ width, height }) => ({
        width,
        height,
        publicPath: `${publicPath}${outputPrefix}${baseName}-${width}x${height}.png`,
        path: `${path}/${outputPrefix}${baseName}-${width}x${height}.png`
    }));
}

export function generateMetaElement(name, content) {
    return `<meta name="${name}" content="${content}">`;
}

export function writeFile(filename, contents) {
    fs.writeFileSync(filename, contents);
    return;
}

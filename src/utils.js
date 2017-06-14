import fs from 'fs';
import toIco from 'to-ico';
import Jimp from 'jimp';
import md5File from 'md5-file/promise';

export async function resizeImage(source, target, width, height) {
    const sourceImg = await Jimp.read(source);
    return new Promise((resolve, reject) => {
        try {
            sourceImg.resize(width, height).write(target, () => resolve(target));
        } catch (error) {
            reject(error);
        }
    });
}

export async function convertToIco(sources, target) {
    const buf = await toIco(sources.map(s => fs.readFileSync(s)));
    fs.writeFileSync(target, buf);
    return target;
}

export async function injectHashIntoFilename(filename, file) {
    const hash = await md5File(file);
    return filename.replace('[hash]', hash);
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

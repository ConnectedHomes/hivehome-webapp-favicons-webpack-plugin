import { injectHashIntoFilename, resizeImage, convertToIco } from '../utils';

export default async function({ title, prefix, source }, { path, publicPath }) {
    const outputPrefix = await injectHashIntoFilename(prefix, source);
    const sizes = [16, 32, 64];

    const iconPngs = await Promise.all(
        sizes.map(size => resizeImage(source, `${path}/${outputPrefix}favicon-${size}x${size}.png`, size, size))
    );

    const faviconFilename = `${outputPrefix}favicon.ico`;
    await convertToIco(iconPngs, `${path}/${faviconFilename}`);

    return {
        html: `
          <link rel="icon" type="image/x-icon" href="${publicPath}${faviconFilename}">
          <link rel="shortcut icon" type="image/x-icon" href="${publicPath}${faviconFilename}">
          ${sizes
              .map(
                  s =>
                      '<link rel="icon" type="image/x-icon" type="image/png" ' +
                      `sizes="${s}x${s}" href="${publicPath}${outputPrefix}favicon-${s}x${s}.png">`
              )
              .join('')}
        `,
        files: [`${path}/${faviconFilename}`, ...sizes.map(s => `${path}/${outputPrefix}favicon-${s}x${s}.png`)]
    };
}

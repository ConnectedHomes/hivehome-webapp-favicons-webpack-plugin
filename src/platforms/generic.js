import { injectHashIntoFilename, resizeImage, convertToIco, generateLinkElement, generateSizeMap } from '../utils';

const IMAGE_SIZES = [
    { width: 16, height: 16 },
    { width: 24, height: 24 },
    { width: 32, height: 32 },
    { width: 48, height: 48 },
    { width: 64, height: 64 }
];

export default async function({ title, prefix, source }, { path, publicPath }) {
    const outputPrefix = await injectHashIntoFilename(prefix, source);
    const faviconFilename = `${outputPrefix}favicon.ico`;
    const faviconPublic = `${publicPath}${faviconFilename}`;

    const sizes = generateSizeMap(IMAGE_SIZES, 'favicon', path, publicPath, outputPrefix);
    const iconPngs = await Promise.all(
        sizes.map(({ width, height, path }) => resizeImage(source, path, width, height))
    );
    await convertToIco(iconPngs, `${path}/${faviconFilename}`);

    const linkElements = [
        generateLinkElement({ rel: 'icon', type: 'image/x-icon', href: faviconPublic }),
        generateLinkElement({ rel: 'shortcut icon', type: 'image/x-icon', href: faviconPublic }),
        ...sizes.map(({ publicPath }) => generateLinkElement({ rel: 'icon', type: 'image/png', href: publicPath }))
    ];

    return {
        html: linkElements.join('\n'),
        files: [`${path}/${faviconFilename}`, ...sizes.map(({ path }) => path)]
    };
}

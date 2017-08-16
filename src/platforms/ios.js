import {
    injectHashIntoFilename,
    resizeImage,
    generateMetaElement,
    generateLinkElement,
    generateSizeMap
} from '../utils';

const IMAGE_SIZES = [
    { width: 57, height: 57 },
    { width: 60, height: 60 },
    { width: 72, height: 72 },
    { width: 76, height: 76 },
    { width: 114, height: 114 },
    { width: 120, height: 120 },
    { width: 144, height: 144 },
    { width: 152, height: 152 },
    { width: 180, height: 180 }
];

export default async function({ title, prefix, source, statusBar }, { path, publicPath }) {
    const outputPrefix = await injectHashIntoFilename(prefix, source);
    const sizes = generateSizeMap(IMAGE_SIZES, 'apple-touch-icon', path, publicPath, outputPrefix);
    await Promise.all(sizes.map(({ path, width, height }) => resizeImage(source, path, width, height)));

    const linkElements = sizes.map(({ width, height, publicPath }) =>
        generateLinkElement({
            rel: 'apple-touch-icon',
            type: 'image/x-icon',
            sizes: `${width}x${height}`,
            href: publicPath
        })
    );

    linkElements.push(generateMetaElement('apple-mobile-web-app-capable', 'yes'));
    linkElements.push(generateMetaElement('apple-mobile-web-app-title', title));

    if (statusBar) {
        linkElements.push(generateMetaElement('apple-mobile-web-app-status-bar-style', statusBar));
    }

    return {
        html: linkElements.join('\n'),
        files: sizes.map(({ path }) => path)
    };
}

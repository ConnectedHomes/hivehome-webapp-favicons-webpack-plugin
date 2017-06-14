import {
    injectHashIntoFilename,
    resizeImage,
    generateMetaElement,
    generateLinkElement,
    generateSizeMap,
    writeFile
} from '../utils';

const IMAGE_SIZES = [
    { width: 36, height: 36 },
    { width: 46, height: 46 },
    { width: 72, height: 72 },
    { width: 96, height: 96 },
    { width: 144, height: 144 },
    { width: 192, height: 192 },
    { width: 256, height: 256 },
    { width: 384, height: 384 },
    { width: 512, height: 512 }
];

export default async function({ title, prefix, source, themeColor, backgroundColor }, { path, publicPath }) {
    const outputPrefix = await injectHashIntoFilename(prefix, source);
    const outputFilename = `${outputPrefix}manifest.json`;
    const manifestPath = `${path}/${outputFilename}`;
    const manifestPublic = `${publicPath}${outputFilename}`;

    const sizes = generateSizeMap(IMAGE_SIZES, 'android-chrome', path, publicPath, outputPrefix);
    await Promise.all(sizes.map(({ path, width, height }) => resizeImage(source, path, width, height)));

    const manifest = generateManifest(title, sizes, themeColor, backgroundColor);
    writeFile(manifestPath, JSON.stringify(manifest, null, '\t'));

    const linkElements = [
        generateLinkElement({ rel: 'manifest', href: manifestPublic }),
        generateMetaElement('mobile-web-app-capable', 'yes'),
        generateMetaElement('apple-mobile-web-app-title', title)
    ];
    if (themeColor) {
        linkElements.push(generateMetaElement('theme-color', themeColor));
    }

    return {
        html: linkElements.join('\n'),
        files: [manifestPath, ...sizes.map(({ path }) => path)]
    };
}

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

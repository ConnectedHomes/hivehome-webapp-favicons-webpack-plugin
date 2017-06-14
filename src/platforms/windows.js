import { injectHashIntoFilename, resizeImage, generateMetaElement, generateSizeMap, writeFile } from '../utils';

const IMAGE_SIZES = [
    { width: 128, height: 128 },
    { width: 144, height: 144 },
    { width: 270, height: 270 },
    { width: 558, height: 270 },
    { width: 558, height: 558 }
];

export default async function({ title, prefix, source, tileColor }, { path, publicPath }) {
    const outputPrefix = await injectHashIntoFilename(prefix, source);
    const outputFilename = `${outputPrefix}browserconfig.xml`;
    const browserConfigPath = `${path}/${outputFilename}`;
    const browserConfigPublic = `${publicPath}${outputFilename}`;

    const sizes = generateSizeMap(IMAGE_SIZES, 'mstile', path, publicPath, outputPrefix);
    await Promise.all(sizes.map(({ path, width, height }) => resizeImage(source, path, width, height, tileColor)));

    const browserConfig = generateBrowserConfig(title, sizes, tileColor);
    writeFile(browserConfigPath, browserConfig);

    const linkElements = [
        generateMetaElement('msapplication-TileImage', `${publicPath}${outputPrefix}mstile-144x144.png`),
        generateMetaElement('msapplication-config', browserConfigPublic)
    ];

    if (tileColor) {
        linkElements.push(generateMetaElement('msapplication-TileColor', tileColor));
    }

    return {
        html: linkElements.join('\n'),
        files: [browserConfigPath, ...sizes.map(({ path }) => path)]
    };
}

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

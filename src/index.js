import assert from 'assert';
import "babel-polyfill";
import platforms from './platforms';
import { addFileToAssets } from './utils';

function HiveHomeFaviconsWebpackPlugin(options) {
    assert(typeof options === 'object', 'HiveHomeFaviconsWebpackPlugin options are required');
    assert(
        options.platforms && Object.keys(options.platforms).length,
        'options.platforms must exist and contain at least one target platform'
    );
    assert(options.prefix, 'options.prefix must be set');
    assert(options.title, 'options.title must be set');

    this.options = options;
}

HiveHomeFaviconsWebpackPlugin.prototype.apply = function(compiler) {
    const self = this;
    let faviconHTML;
    let files;

    compiler.plugin('make', async function(compilation, callback) {
        try {
            const { title, prefix } = self.options;
            const configs = Object.entries(self.options.platforms);

            const results = await Promise.all(
                configs.map(
                    ([platform, config]) =>
                        platforms[platform] &&
                        platforms[platform]({ title, prefix, ...config }, compilation.outputOptions)
                )
            );

            files = results.reduce((a, r) => [...a, ...r.files], []);
            faviconHTML = results.reduce((a, r) => `${a}${r.html}\n`, '');
            callback();
        } catch (error) {
            callback(error);
        }
    });

    compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-before-html-processing', async function(htmlPluginData, callback) {
            try {
                await Promise.all(files.map(f => addFileToAssets(f, compilation.outputOptions.path, compilation)));
                htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/i, faviconHTML + '$&');
                callback(null, htmlPluginData);
            } catch (error) {
                callback(error);
            }
        });
    });
};

module.exports = HiveHomeFaviconsWebpackPlugin;

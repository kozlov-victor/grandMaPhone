
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const cliUI = require('./node_tools/cliUI');
const ESLintPlugin = require('eslint-webpack-plugin');

class WebpackDonePlugin{
    apply(compiler){
        compiler.hooks.done.tap('compilation',  (stats)=> {
            const date = new Date();
            const leadZero = (val)=>{
                if ((''+val).length===1) return `0${val}`;
                else return `${val}`;
            };
            const hh = leadZero(date.getHours());
            const mm = leadZero(date.getMinutes());
            const ss = leadZero(date.getSeconds());
            setTimeout(()=>{
                if (stats.compilation.errors && stats.compilation.errors.length) {
                    cliUI.showErrorWindow(
                        [
                            `--===compiled with errors===--`,
                            `-----${hh}:${mm}:${ss}-----`
                        ]
                    );
                } else {
                    cliUI.showInfoWindow(
                        [
                            `--===compiled===--`,
                            `-----${hh}:${mm}:${ss}-----`
                        ]
                    );
                    let indexHtml = fs.readFileSync('./index.html','utf-8');
                    const polyfills = fs.readFileSync('./build/polyfills.js','utf-8');
                    const launcherApp = fs.readFileSync('./build/launcherApp.js','utf-8');
                    const callApp = fs.readFileSync('./build/callApp.js','utf-8');

                    fs.writeFileSync(
                        '../app/src/main/assets/index.html',
                        indexHtml.split('//PLACEHOLDER').join(`${polyfills}\n${launcherApp}`)
                    );
                    fs.writeFileSync(
                        '../../grandMaCall/app/src/main/assets/index.html',
                        indexHtml.split('//PLACEHOLDER').join(`${polyfills}\n${callApp}`)
                    );

                }

            },10);

        });

    }
}

module.exports = async (env={})=>{

    await cliUI.showInfoWindow(
        [
            ` --===started===-- `,
            `--vEngine compiler--`,
        ]
    );


    const debug = env.debug==='true';

    const entry = {};
    const output = {
        path: path.resolve('./build/'),
        filename:'[name].js',
        //chunkFilename: "[name].chunk.js",
    };

    entry['launcherApp'] = [`./app/launcherApp.tsx`];
    entry['callApp'] = [`./app/callApp.tsx`];
    entry['polyfills'] = [`./app/polyfills-separate.ts`];


    console.log('webpack started at',new Date());
    console.log('env',env);
    console.log({entry,output});

    const config = {
        entry,
        output,
        target: ['web', 'es5'],
        mode: 'production', //debug ? 'development' : 'production',
        //devtool: 'inline-source-map',
        resolveLoader: {
            modules: ['node_modules', path.resolve(__dirname, 'node_tools/loaders')]
        },
        watchOptions: {
            poll: true
        },
        performance: {
            maxEntrypointSize: 1024000,
            maxAssetSize: 1024000
        },
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: "ts-engine-precompiler/tsx-precompiler"
                        },
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "ts-loader",options: {},
                        },
                    ]
                },
            ]
        },
        resolve: {
            extensions: ['.ts','.tsx'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
            ],
            alias: {
                '@engine': path.resolve(__dirname, 'engine'),
            },
        },
        optimization: {
            minimize: !debug,
            emitOnErrors: false,
        },
    };

    if (!debug) {

        config.optimization.minimizer = [new TerserPlugin({
            terserOptions: {
                ecma: false,
                parse: {},
                compress: {},
                mangle: {
                    properties: {
                        regex: "/^_/",
                    },
                },
                module: false,
                toplevel: true,
                ie8: true,
                keep_classnames: undefined,
                keep_fnames: false,
                safari10: true,
            }
        })]
    }

    config.plugins = [
        new webpack.DefinePlugin({
            BUILD_AT: webpack.DefinePlugin.runtimeValue(() => new Date().getTime()),
            DEBUG: debug,
        }),
        new ESLintPlugin({
            context: '../', // <-- change context path
            emitError: true,
            emitWarning: true,
            failOnError: true,
            extensions: ["ts", "tsx"],
        }),
        new WebpackDonePlugin()
    ];

    return config;
};



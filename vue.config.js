const path = require('path');
const resolve = dir => require("path").join(__dirname, dir);
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.symlinks(true);
    },//自动热更新
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                //这个是加上自己的路径，
                //注意：试过不能使用别名路径
                path.resolve(__dirname, './src/assets/init.less')
            ]
        }
    },
    devServer: {
        proxy: {
            '/api':{
                target:'http://47.96.4.213',
                changeOrigin:true,
                pathRewrite:{
                    '/api':'http://47.96.4.213'
                }
            }
        }
    },
    configureWebpack:{
        resolve: {
            alias: {
                "@": resolve("src")
            }
        }
    }
    /*configureWebpack: config => {
        // if (process.env.VUE_APP_MODE === 'dev' || process.env.VUE_APP_MODE === 'local') {
            console.log('打包压缩',process.env);
            // 为生产环境修改配置
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true,
                            drop_console: true,  //生产环境自动删除console
                        },
                        warnings: false,
                    },
                    cache:true,
                    sourceMap: false,
                    parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
                })
            );
        // }
    }*/
};

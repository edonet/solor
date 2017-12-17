/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 18:00:51
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    path = require('path'),
    usedir = dir => (...args) => path.resolve(dir, ...args),
    dir = usedir(path.resolve(__dirname, '../')),
    env = process.env.NODE_ENV,
    isProduction = env === 'production';


/**
 *****************************************
 * 抛出配置
 *****************************************
 */
module.exports = {
    env,
    isProduction,
    rootDir: dir(),
    src: dir('src'),
    dist: dir('dist'),
    entry: dir('src/index.js'),
    index: dir('src/index.html'),
    filename: 'js/[name].[chunkhash].js',
    publicPath: './',
    alias: {
        solor: dir('lib'),
        selector: dir('lib/selector'),
        utils: dir('lib/utils'),
        style: dir('lib/style')
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },
    devServer: {
        host: require('./ip')()
    }
};

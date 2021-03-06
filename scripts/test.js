/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 18:08:25
 *****************************************
 */
'use strict';


/*
 ****************************************
 * 设置环境变量
 ****************************************
 */
process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';
process.env.PUBLIC_URL = '';


/**
 *****************************************
 * 监听未捕捉的异常
 *****************************************
 */
process.on('unhandledRejection', err => {
    throw err;
});


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    jest = require('jest'),
    path = require('path'),
    argv = process.argv.slice(3),
    config = path.resolve(__dirname, '../jest/index.js');


/**
 *****************************************
 * 添加文件修改监听
 *****************************************
 */
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push('--watch', '--config', config);
}


/**
 *****************************************
 * 启动测试
 *****************************************
 */
jest.run(argv);

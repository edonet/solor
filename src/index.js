/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 22:42:35
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import render, { AppContainer } from 'solor';
import App from './app';


/**
 *****************************************
 * 渲染【App】
 *****************************************
 */
render((
    <AppContainer><App /></AppContainer>
), 'app');


/**
 *****************************************
 * 启用热更新
 *****************************************
 */
if (module.hot) {

    // 接收模块更新
    module.hot.accept(['solor', './app'], () => {
        let app = require('./app');

        // 渲染组件
        render((
            <AppContainer title="Sigo">{ app.default }</AppContainer>
        ), 'app');
    });
}

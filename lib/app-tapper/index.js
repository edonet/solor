/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-19 21:49:36
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import touch from './touch';


/**
 *****************************************
 * 点击组件
 *****************************************
 */
export default class AppTapper extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 创建点击事件
        this.$$events = touch((name, ...args) => {
            name in this.props && this.props[name](...args);
        });
    }

    /* 渲染组件 */
    render() {
        let { className, style, children } = this.props,
            props = { className, style, ...this.$$events };

        // 返回元素
        return (
            <a { ...props } href="javascript:;">{ children }</a>
        );
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export { touch };

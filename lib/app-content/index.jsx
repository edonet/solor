/**
 *****************************************
 * Created by lifx
 * Created on 2017-11-19 11:39:31
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './index.scss';
import { Component } from 'react';
import { appendChild, removeChild } from '../app-provider';
import updateAppContent from './actions';



/**
 *****************************************
 * 内容组件
 *****************************************
 */
export default class AppContent extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 创建元素
        this.$$container = document.createElement('article');
        this.$$container.className = 'app-content abs box ovhd';

        // 挂载元素
        updateAppContent(this.$$container);
        appendChild(this.$$container);
    }

    /* 无需更新 */
    shouldComponentUpdate() {
        return false;
    }

    /* 渲染内容 */
    render() {
        return null;
    }

    /* 即将卸载 */
    componentWillUnmount() {
        removeChild(this.$$container);
    }
}

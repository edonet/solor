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
import React, { Component } from 'react';
import { render as renderElement } from 'utils/component';
import updateAppContent, { appendChild, removeChild } from './actions';
import AppView from '../app-view';



/**
 *****************************************
 * 内容组件
 *****************************************
 */
export default class AppContent extends Component {

    /* 渲染内容 */
    render() {
        let { children, ...props } = this.props;

        // 返回元素
        return (
            <article className="app-content abs box ovhd" ref={ updateAppContent }>
                <AppView>404 @:@!</AppView>
                <AppView path="/" { ...props }>{ renderElement({ children }) }</AppView>
            </article>
        );
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export { appendChild, removeChild };

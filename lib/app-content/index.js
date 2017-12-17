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
import updateAppContent, { appendChild, removeChild } from './actions';



/**
 *****************************************
 * 内容组件
 *****************************************
 */
export default class AppContent extends Component {

    /* 渲染内容 */
    render() {
        return (
            <article className="app-content abs box ovhd" ref={ updateAppContent }>
                { this.props.children }
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

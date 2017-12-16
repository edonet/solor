/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 23:25:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import routeConfirmation from './confirmation';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
export default class AppRouter extends Component {

    /* 渲染组件 */
    render() {
        return (
            <HashRouter
                forceRefresh={ !('pushState' in window.history) }
                getUserConfirmation={ routeConfirmation }>
                { this.props.children }
            </HashRouter>
        );
    }
}

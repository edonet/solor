/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 14:34:21
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { dispatch } from 'selector';
import { updateAppRouter } from './actions';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
class AppRouter extends Component {

    /* 即将挂载 */
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    /* 更新属性 */
    componentWillReceiveProps(props) {

        // 更新路由
        dispatch(updateAppRouter(props));
    }

    /* 获取上下文路径 */
    getChildContext() {
        return { $$pathname: '/' };
    }

    /* 渲染组件 */
    render() {
        return this.props.children;
    }
}


/**
 *****************************************
 * 定义子上下文类型
 *****************************************
 */
AppRouter.childContextTypes = {
    $$pathname: PropTypes.string
};


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default withRouter(AppRouter);

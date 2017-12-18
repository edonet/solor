/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 12:48:09
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import selector from 'selector';
import createHistory from './history';
import { matchState } from './matchState';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
class AppRoute extends Component {

    /* 渲染元素 */
    render() {
        let context = this.context.$$pathname,
            history = {
                ...this.props.$router, ...createHistory(context)
            };


        console.log('--> routeWillUpdate:');

        // 匹配路径
        history.match = matchState(history);

        // 返回历史对象
        return this.props.render(history);
    }

    /* 组件挂载完成 */
    componentDidMount() {
        this.componentDidUpdate();
    }

    /* 组件更新完成 */
    componentDidUpdate() {
        console.log('--> routeDidUpdated:');
    }
}


/**
 *****************************************
 * 获取路由上下文
 *****************************************
 */
AppRoute.contextTypes = {
    $$pathname: PropTypes.string
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default selector('$router')(AppRoute);

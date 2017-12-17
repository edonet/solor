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
import { updateAppHistory } from '../actions';
import resolvePath from './resolvePath.js';


/**
 *****************************************
 * 路由组件
 *****************************************
 */
class AppRoute extends Component {

    /* 渲染元素 */
    render() {
        let context = this.context.$$pathname,
            history = { ...this.props.$router, context };

        // 解析路径
        history.resolve = resolvePath(context);

        // 跳转路径
        history.go = (path, { method = 'PUSH' } = {}) => (
            path && updateAppHistory({ action: 'PUSH', method, pathname: history.resolve(path) })
        );

        // 跳转路径
        history.replace = (path, { method = 'REPLACE' } = {}) => (
            path && updateAppHistory({ action: 'REPLACE', method, pathname: history.resolve(path) })
        );

        // 回退路径
        history.goBack = (step = -1) => {
            let type = typeof step;

            // 按步回退
            if (type === 'number') {
                return updateAppHistory({ action: 'POP', step });
            }

            // 回退到指定路径
            if (type === 'string') {
                return updateAppHistory({ action: 'POP', pathname: history.resolve(step) });
            }
        };

        // 返回历史对象
        return this.props.render(history);
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

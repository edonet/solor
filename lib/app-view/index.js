/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-18 17:28:34
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
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { render as renderElement } from 'utils/component';
import { appendChild, removeChild } from '../app-content';
import { withRouter } from '../app-router';
import { updateAppHeader } from '../app-header';


/**
 *****************************************
 * 视图切换
 *****************************************
 */
const
    viewAction = {
        enter: { 'PUSH': 'right-enter', 'POP': 'left-enter', 'REPLACE': 'show' },
        leave: { 'PUSH': 'left-leave', 'POP': 'right-leave', 'REPLACE': 'hide' }
    };


/**
 *****************************************
 * 视图组件
 *****************************************
 */
class AppView extends Component {

    /* 初始化组件 */
    constructor(props, ...args) {
        super(props, ...args);

        // 创建节点
        this.$$container = document.createElement('section');
        this.$$container.className = 'app-view abs box hide';

        // 定义更新器
        this.$$hasHeader = false;
        this.$$updater = props => (action, method) => {
            let classList = ['app-view abs box'];

            console.log(`--> ${action}:`, this.state.path);

            // 更新标题
            action === 'enter' && this.updateHeader(props);

            // 添加善样式
            this.$$hasHeader && classList.push('has-header');

            // 添加切换行为
            classList.push(viewAction[action][method]);

            // 更新容器
            this.$$container.className = classList.join(' ');
        };

        // 定义状态
        this.state = { path: '/', matched: false, show: false };

        // 添加视图
        appendChild(this.$$container);
    }

    /* 获取上下文路径 */
    getChildContext() {
        return {
            $$pathname: this.state.path
        };
    }

    /* 即将挂载 */
    componentWillMount() {

        // 处理属性
        this.componentWillReceiveProps(this.props);
    }

    /* 更新属性 */
    componentWillReceiveProps(props) {
        let { history: { match }, path } = props,
            matched = match(path, this.$$updater(props)),
            show = this.state.show;


        // 是否显示视图
        if (path) {
            show = matched.url || this.state.matched ? true : false;
        }

        // 更新状态
        this.setState({
            show, path: matched.path, matched: matched.isExact
        });
    }

    /* 是否需要更新组件 */
    shouldComponentUpdate(props, state) {
        return (
            state.show !== this.state.show
        );
    }

    /* 渲染组件 */
    render() {

        // 渲染元素
        return createPortal(
            this.state.show && renderElement(this.props), this.$$container
        );
    }

    /* 更新头部 */
    updateHeader(props) {
        let {
                history: { method, length },
                title, navBar = true,
                navBack = length > 1, navLeft = null, navRight = null
            } = props;


        // 获取是否有善
        this.$$hasHeader = navBar;

        // 更新头部
        updateAppHeader({
            show: navBar, title, navBack, navLeft, navRight, method
        });
    }

    /* 卸载组件 */
    componentWillUnmount() {
        removeChild(this.$$container);
    }
}


/**
 *****************************************
 * 定义子上下文类型
 *****************************************
 */
AppView.childContextTypes = {
    $$pathname: PropTypes.string
};


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default withRouter(AppView);

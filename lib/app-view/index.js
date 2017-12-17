/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 17:48:52
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
import matchState, { stateWillUpdate, stateDidUpdate } from './match';


/**
 *****************************************
 * 视图切换类型
 *****************************************
 */
const
    actionType = {
        PUSH: { enter: 'right-enter', leave: 'left-leave' },
        REPLACE: { enter: 'show', leave: 'hide' },
        POP: { enter: 'left-enter', leave: 'right-leave' }
    };


/**
 *****************************************
 * 视图组件
 *****************************************
 */
class AppView extends Component {

    /* 初始化组件 */
    constructor(props, context) {
        super(props, context);

        // 创建视图
        this.$$className = 'app-view abs box hide';
        this.$$container = document.createElement('section');

        // 设置状态
        this.state = { path: '', show: 0, isExact: false };

        // 绑定回调
        this.updateView = this.updateView.bind(this);

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
        let { history, path } = props,
            matched = matchState(history)(path, this.updateView),
            show = this.state.show;


        // 是否显示视图
        if (path) {
            show = matched.url || this.state.isExact ? 1 : 0;
        }

        // 更新状态
        this.setState({
            show, path: matched.path, isExact: matched.isExact
        });
    }

    /* 是否需要更新组件 */
    shouldComponentUpdate(props, state) {
        return (
            state.show !== this.state.show
        );
    }

    /* 渲染视图 */
    render() {

        // 打印渲染信息
        console.log('--> render:', this.state.path);

        // 执行路由更新
        stateWillUpdate(this.props.path);

        // 设置视图样式
        this.$$container.className = this.$$className;

        // 渲染元素
        return createPortal(
            this.state.show && renderElement(this.props), this.$$container
        );
    }

    /* 挂载完成 */
    componentDidMount() {
        this.componentDidUpdate();
    }

    /* 完成视图更新 */
    componentDidUpdate() {
        console.log('--> didUpdate', this.state.path);

        // 执行路由更新
        stateDidUpdate(this.props.path);
    }

    /* 更新视图 */
    updateView(type, method) {
        let action = actionType[method || 'REPLACE'][type],
            { navBar = true } = this.props;

        console.log('-->', type + ':', this.state.path);

        // 更新容器样式
        this.$$container.className = this.$$className = (
            'app-view abs box ' + (navBar ? 'has-header ' : '') + action
        );

        // 处理视图切换
        if (type === 'enter') {

            // 更新头部
            this.updateHeader();

            // 显示视图
            this.state.show || this.setState({ show: 1 });

        } else {

            // 隐藏【404】路由
            this.props.path || setTimeout(
                () => this.setState({ show: 0 }), 500
            );
        }
    }

    /* 更新头部 */
    updateHeader(props = this.props) {
        let {
                history: { method, length },
            title, navBar = true,
            navBack = length > 1, navLeft = null, navRight = null
            } = props;


        // 更新头部
        updateAppHeader({
            show: navBar, title, navBack, navLeft, navRight, method
        });
    }

    /* 即将卸载 */
    componentWillUnmount() {

        // 移除视图
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

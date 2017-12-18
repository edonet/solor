/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 22:40:52
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import './style';
import { render as renderElement } from 'react-dom';
import AppContainer from './app-container';
import AppView from './app-view';
import AppLink from './app-link';


/**
 *****************************************
 * 渲染【App】
 *****************************************
 */
export default function render(App, target) {

    // 获取根节点
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 挂载组件
    return renderElement(App, target);
}


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export { AppContainer, AppView, AppLink };

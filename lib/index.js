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
import render from './app-provider';
import AppContainer from './app-container';
import AppView from './app-view';
import AppLink from './app-link';


/**
 *****************************************
 * 渲染【App】
 *****************************************
 */
export default render;


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export { AppContainer, AppView, AppLink };

/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-19 10:04:52
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { render, unmountComponentAtNode } from 'react-dom';


/**
 *****************************************
 * 初始化数据模型
 *****************************************
 */
const
    model = {
        root: null,
        container: null
    };


/**
 *****************************************
 * 挂载组件
 *****************************************
 */
export default function mount(App, target) {

    // 判断是否需要更新节点
    if (target !== model.root) {

        // 卸载组件
        unmount();

        // 生成组件节点
        model.root = target;
        model.container = document.createElement('div');

        // 挂载节点
        // model.root.appendChild(model.container);
    }

    // 渲染组件
    render(App, model.container);
}


/**
 *****************************************
 * 卸载组件
 *****************************************
 */
export function unmount() {
    if (model.root) {
        unmountComponentAtNode(model.container);
        model.root.removeChild(model.container);
        model.container = null;
        model.root = null;
    }
}


/**
 *****************************************
 * 添加元素
 *****************************************
 */
export function appendChild(el) {
    model.root && model.root.appendChild(el);
}


/**
 *****************************************
 * 移除元素
 *****************************************
 */
export function removeChild(el) {
    model.root && model.root.removeChild(el);
}

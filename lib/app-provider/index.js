/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-19 10:04:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import mount, { unmount, appendChild, removeChild } from './actions';


/**
 *****************************************
 * 渲染组件
 *****************************************
 */
export default function render(App, target) {

    // 获取根节点
    if (typeof target === 'string') {
        target = document.getElementById(target);
    }

    // 挂载组件
    return mount(App, target);
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export {
    unmount, appendChild, removeChild
};

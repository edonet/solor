/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 17:21:45
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {
    target: document.createElement('article')
};


/**
 *****************************************
 * 定义样式
 *****************************************
 */
model.target.className = 'app-content abs box ovhd';


/**
 *****************************************
 * 添加到节点
 *****************************************
 */
export default function appendTo(container) {
    return container.appendChild(model.target);
}


/**
 *****************************************
 * 添加子节点
 *****************************************
 */
export function appendChild(el) {
    return model.target.appendChild(el);
}


/**
 *****************************************
 * 移除子节点
 *****************************************
 */
export function removeChild(el) {
    return model.target.removeChild(el);
}

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
const model = { target: null, views: [] };


/**
 *****************************************
 * 更新数据模型
 *****************************************
 */
export default function updateAppContent(el) {

    // 更新对象
    model.target = el;

    // 添加视图
    if (model.target) {
        while (model.views.length) {
            model.target.appendChild(model.views.shift());
        }
    }
}



/**
 *****************************************
 * 添加视图
 *****************************************
 */
export function appendChild(el) {
    return model.target ? model.target.appendChild(el) : model.views.push(el);
}


/**
 *****************************************
 * 移除视图
 *****************************************
 */
export function removeChild(el) {
    return model.target && model.target.removeChild(el);
}

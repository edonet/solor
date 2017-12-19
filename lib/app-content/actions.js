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
const model = { target: null };


/**
 *****************************************
 * 更新数据模型
 *****************************************
 */
export default function updateAppContent(target) {
    return model.target = target;
}


/**
 *****************************************
 * 挂载元素
 *****************************************
 */
export function mount(el) {

    // 挂载元素
    model.target && model.target.appendChild(el);

    // 卸载元素
    return (target => () => {
        target && target.removeChild(el);
        target = null;
        el = null;
    })(model.target);
}

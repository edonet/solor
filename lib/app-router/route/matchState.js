/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-18 17:48:15
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {
    callback: null, otherwise: []
};


/**
 *****************************************
 * 状态匹配
 *****************************************
 */
export default function matchState({ context, resolve }) {
    return function match(url, callback) {
        let matched = { path: resolve(url || './__404__'), url: '' };

        if (url) {

        }

        // 添加【404】回调
        model.otherwise.push({ context, callback });
    };
}

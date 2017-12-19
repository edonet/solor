/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-18 17:48:15
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { matchPath } from 'react-router';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {
    matched: false, callback: null, otherwise: []
};


/**
 *****************************************
 * 更新匹配器
 *****************************************
 */
export default function updateAppMatcher({ data: { pathname, method } }) {
    model.matched = false;
    model.pathname = pathname;
    model.method = method;
    model.otherwise = [];
}


/**
 *****************************************
 * 状态匹配
 *****************************************
 */
export function matchState({ context, pathname, resolve }) {
    return function match(path, callback) {
        let state = {
                path: resolve(path || './__404__'), url: '', isExact: false
            };


        // 判断是否需要匹配
        if (path) {

            // 不匹配【404】的子页面
            if (!context.endsWith('/__404__')) {
                let matched = matchPath(pathname, { path: state.path });

                // 匹配成功
                if (matched) {

                    // 完全匹配
                    if (matched.isExact) {

                        // 过滤重复的匹配
                        if (model.matched) {
                            return state;
                        }

                        // 执行匹配回调
                        invokeCallback(callback);

                        // 更新匹配信息
                        state.isExact = matched.isExact;
                    }

                    // 获取匹配到的【url】
                    state.url = matched.url;
                }
            }

            return state;
        }

        // 添加【404】回调
        model.otherwise.push({ context, callback });

        // 返回匹配对象
        return state;
    };
}


/**
 *****************************************
 * 执行匹配回调
 *****************************************
 */
function invokeCallback(callback) {

    // 更新匹配状态
    model.matched = true;

    // 执行视图进入回调
    callback && callback('enter', model.method);

    // 更新视图退回回调
    model.callback && model.callback('leave', model.method);

    // 更新视图回调
    model.callback = callback;
}

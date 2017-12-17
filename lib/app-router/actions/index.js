/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 10:36:50
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { UPDATE_APP_ROUTER } from './types';


/**
 *****************************************
 * 创建数据模型
 *****************************************
 */
const model = {
    pathname: '', history: null, histories: [], stats: null
};


/**
 *****************************************
 * 更新路由模型
 *****************************************
 */
export function updateAppRouter({ history, location }) {
    let action = history.action,
        method = action,
        pathname = location.pathname,
        stats = model.stats || {},
        histories = model.histories || [],
        len = histories.length;


    // 处理路由历史
    if (len) {

        // 获取跳转方式
        if (pathname === stats.pathname && action === stats.action) {
            method = stats.method;
        }

        // 更新历史记录
        if (pathname !== model.pathname) {
            if (action === 'PUSH') {

                // 添加历史记录
                histories = histories[len - 1] === pathname ? histories : [...histories, pathname];

            } else if (action === 'REPLACE' && method !== 'POP') {

                // 替换路由
                histories = histories.slice(0, len - 1).concat([pathname]);

            } else {

                // 弹出路由
                (idx => {
                    histories = idx > 0 ? histories.slice(0, idx + 1) : [pathname];
                })(histories.lastIndexOf(pathname));
            }
        }

    } else {

        // 初始化路径
        method = 'REPLACE';
        histories = [pathname];
    }

    // 更新数据模型
    model.pathname = pathname;
    model.history = history;
    model.histories = histories;
    model.stats = null;

    // 返回行为对象
    return {
        type: UPDATE_APP_ROUTER,
        data: {
            action, method, pathname, histories, length: histories.length
        }
    };
}


/**
 *****************************************
 * 更新路由历史
 *****************************************
 */
export function updateAppHistory({ action, method = action, pathname, step }) {

    // 跳转到路径
    if (action === 'PUSH') {

        // 更新状态
        if (pathname && pathname !== model.pathname) {
            model.stats = { action, method, pathname };
            model.history.push(pathname);
        } else {
            model.stats = null;
        }

        // 返回状态
        return model.stats;
    }


    // 返回路径
    if (action === 'POP') {
        let histories = model.histories,
            len = histories.length;

        if (pathname && pathname !== model.pathname) {
            let idx = histories.lastIndexOf(pathname);

            if (idx > -1) {
                model.stats = { action: 'POP', method: 'POP', pathname };
                model.history.go(idx + 1 - len);
            } else {
                model.stats = { action: 'REPLACE', method: 'POP', pathname };
                model.history.replace(pathname);
            }

        } else if(step) {

            // 获取路径
            pathname = histories[len + step];

            // 更新状态
            if (pathname && pathname !== model.pathname) {
                model.stats = { action: 'POP', method: 'POP', pathname };
                model.history.go(step);
            } else {
                model.stats = null;
            }
        }

        // 返回状态
        return model.stats;
    }

    // 替换路径
    if (action === 'REPLACE') {

        // 更新状态
        if (pathname && pathname !== model.pathname) {
            model.stats = { action, method, pathname };
            model.history.replace(pathname);
        } else {
            model.stats = null;
        }

        // 返回状态
        return model.stats;
    }
}

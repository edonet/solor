/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-18 21:19:43
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { updateAppHistory } from '../actions';


/**
 *****************************************
 * 定义数据模型
 *****************************************
 */
const model = {};


/**
 *****************************************
 * 生成历史对象
 *****************************************
 */
export default function createHistory(context) {

    // 判断缓存是否可用
    if (!(context in model)) {
        let history = { context },
            resolve = resolvePath(context);

        // 解析路径
        history.resolve = resolve;

        // 跳转路径
        history.go = (path, { method = 'PUSH' } = {}) => (
            path && updateAppHistory({ action: 'PUSH', method, pathname: resolve(path) })
        );

        // 跳转路径
        history.replace = (path, { method = 'REPLACE' } = {}) => (
            path && updateAppHistory({ action: 'REPLACE', method, pathname: resolve(path) })
        );

        // 回退路径
        history.goBack = (step = -1) => {
            let type = typeof step;

            // 按步回退
            if (type === 'number') {
                return updateAppHistory({ action: 'POP', step });
            }

            // 回退到指定路径
            if (type === 'string') {
                return updateAppHistory({ action: 'POP', pathname: resolve(step) });
            }
        };

        // 缓存对象
        model[context] = history;
    }

    // 返回对象
    return model[context];

}


/**
 *****************************************
 * 解析路径
 *****************************************
 */
export function resolvePath(context = '/') {

    // 返回解析函数
    return function resolve(...args) {
        let path = args.reduce((str, curr) => {

                // 过滤非法参数
                if (!curr || typeof curr !== 'string') {
                    return str;
                }

                // 返回绝对路径
                if (curr[0] === '/') {
                    return curr;
                }

                // 返回连接后的路径
                return str + '/' + curr;
            }, '.');


        // 处理路径
        if (path) {

            // 处理绝对路径
            if (path[0] === '/') {
                return path;
            }

            // 分割路径
            path = context.split('/').concat(path.split('/'));

            // 组合路径
            path = path.reduce((arr, curr) => {
                if (curr === '.' || !curr) {
                    return arr;
                }

                if (curr === '..') {
                    arr.pop();
                } else {
                    arr.push(curr);
                }

                return arr;
            }, []);

            // 合并路径
            return path[0] ? '/' + path.join('/') : path.join('/');
        }

        // 无需处理
        return context;
    };
}

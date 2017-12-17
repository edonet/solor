/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 12:57:32
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 解析路径
 *****************************************
 */
export default function resolvePath(context = '/') {

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

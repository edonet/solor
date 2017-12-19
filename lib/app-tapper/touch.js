/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-19 21:58:50
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { point, update } from './utils';


/**
 *****************************************
 * 创建触控事件
 *****************************************
 */
export default function touch(emit = f => f) {
    let model = {
            status: 'pending',
            touches: [],
            tapable: true
        },
        onTouchStart = handleTouchStart(model, emit),
        onTouchEnd = handleTouchEnd(model, emit);


    // 返回事件回调
    return {
        onTouchStart, onTouchMove: onTouchStart,
        onTouchEnd, onTouchCancel: onTouchEnd
    };
}



/**
 *****************************************
 * 处理触控开始
 *****************************************
 */
function handleTouchStart(model, emit) {
    return function onTouchStart(event) {
        let touches = event.touches;

        // 开始触控
        if (model.status === 'pending') {

            // 获取触控点位
            model.touches = [].map.call(touches, point);

            // 触发触控开始事件
            emit('onTouchStart', event, touches);

            // 更新状态
            return model.status = 'start';
        }

        // 更新点位
        model.touches = [].map.call(
            touches, (touch, idx) => update(model.touches[idx], touch)
        );

        // 触发触控开始事件
        return emit('onTouchMove', event, touches);
    };
}


/**
 *****************************************
 * 处理触控开始
 *****************************************
 */
function handleTouchEnd(model, emit) {
    return function onTouchEnd(event) {

        // 过滤无效的事件
        if (model.status === 'pending') {
            return;
        }

        // 更新状态
        model.status = 'pending';

        // 触发触控结束事件
        emit('onTouchEnd', event, model.touches);

        // 处理触控结束
        if (model.touches.length < 2 && model.tapable) {

            // 处理点击
            if (model.tapable) {
                let { sx, sy, st, x = sx, y = sy, t = st } = model.touches[0],
                    tap = t - st < 1000 && Math.abs(x - sx) < 10 && Math.abs(y - sy) < 10;

                // 触发点击事件
                if (tap) {
                    return emit('onTap', event, model.touches);
                }
            }

            // 设置可点击
            model.tapable = true;

            // 触发移动结束
            emit('onMoveEnd', event, model.touches);

        } else {

            // 阻止点击
            model.tapable = false;

            // 触发缩放结束
            emit('onScaleEnd', event, model.touches);
        }
    };
}

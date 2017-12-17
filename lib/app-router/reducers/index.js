/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 12:05:16
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { contain } from 'utils';
import { UPDATE_APP_ROUTER } from '../actions/types';


/**
 *****************************************
 * 更新路由记录
 *****************************************
 */
export const $router = (state = {}, { type, data }) => (
    type === UPDATE_APP_ROUTER && !contain(state, data) ? { ...state, ...data } : state
);

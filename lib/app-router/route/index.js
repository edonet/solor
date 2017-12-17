/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-17 13:49:53
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React, { createElement } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { getDisplayName } from 'utils/component';
import AppRoute from './index.jsx';


/**
 *****************************************
 * 抛出组件
 *****************************************
 */
export default AppRoute;
export { withRouter };


/**
 *****************************************
 * 绑定路由组件
 *****************************************
 */
function withRouter(SubComponent) {
    let AppHOCompoent = props => (
        <AppRoute render={
            history => createElement(SubComponent, { ...props, history })
        } />
    );

    /* 生成组件名称 */
    AppHOCompoent.displayName = `withAppRouter(${getDisplayName(SubComponent)})`;

    /* 缩写【SubComponent】上的静态方法 */
    hoistNonReactStatic(AppHOCompoent, SubComponent);

    /* 返回组件 */
    return AppHOCompoent;
}

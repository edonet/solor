/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 23:25:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */

import AppRouter from './index.jsx';
import { withRouter } from './route';
import routeConfirmation from './confirmation';
import resolvePath from './route/resolvePath';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default AppRouter;
export { withRouter, routeConfirmation, resolvePath };

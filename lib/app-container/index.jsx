/**
 *****************************************
 * Created by lifx
 * Created on 2017-12-16 22:52:10
 *****************************************
 */
'use strict';



/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { AppContainer as AppHotContainer } from 'react-hot-loader';
import AppRouter, { routeConfirmation } from '../app-router';


/**
 *****************************************
 * 容器组件
 *****************************************
 */
export default function AppProvider(props) {
    return (
        <Provider store={ props.store }>
            <HashRouter
                forceRefresh={!('pushState' in window.history)}
                getUserConfirmation={routeConfirmation}>
                <AppHotContainer>
                    <div className="app-container abs box">
                        <AppRouter>{ props.children } </AppRouter>
                    </div>
                </AppHotContainer>
            </HashRouter>
        </Provider>
    );
}

/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import mainReducer from './reducers/mainReducer';
import persistentMenuReducer from './reducers/persistentMenuReducer';
import getStartedReducer from './reducers/getStartedReducer';

export default createStore(
  combineReducers({mainReducer, persistentMenuReducer, getStartedReducer}),
  composeWithDevTools(applyMiddleware(thunk))
)

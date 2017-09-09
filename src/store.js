import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {routerReducer, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import mainReducer from './reducers/mainReducer';
import persistentMenuReducer from './reducers/persistentMenuReducer';
import getStartedReducer from './reducers/getStartedReducer';
import greetingTextReducer from "./reducers/greetingTextReducer";
import whitelistedDomainsReducer from "./reducers/whitelistedDomainsReducer";

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

export default createStore(
  combineReducers({
    mainReducer,
    persistentMenuReducer,
    getStartedReducer,
    greetingTextReducer,
    whitelistedDomainsReducer,
    routerReducer
  }),
  composeWithDevTools(applyMiddleware(thunk, middleware))
)

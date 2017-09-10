import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Route} from 'react-router';

import store, {history} from './store';
import HomePage from './home';
import AboutPage from './about';

const container = document.getElementById('container');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route path="/main" component={HomePage}/>
        <Route exact path="/about" component={AboutPage}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  container
);

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {connect} from 'react-redux';
import MainComponent from './MainComponent';

const setAccessToken = (accessToken) => {
  return {type: 'SET_ACCESS_TOKEN', accessToken};
};

const sendFacebookPostRequest = (accessToken, body, successMessage) => {
  return (dispatch) => {
    fetch(`https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw "Something wrong with the request";
    }).then(response => {
      console.log(response);
      return dispatch({type: 'SEND_FACEBOOK_HTTP_REQUEST_FINISH', message: successMessage})
    }).catch(error => {
      console.log(error);
      return dispatch({type: 'SEND_FACEBOOK_HTTP_REQUEST_FINISH', message: 'Something went wrong'});
    });
    return dispatch({type: 'START_SEND_FACEBOOK_HTTP_REQUEST'});
  }
};

const switchTab = (tabName) => {
  return {type: 'SWITCH_TAB', tabName}
};

const mapStateToProps = (state) => {
  return {
    main: state.mainReducer,
    currentTab: state.mainReducer.currentTab,
    persistentMenu: state.persistentMenuReducer,
    getStartedButton: state.getStartedReducer,
    greetingText: state.greetingTextReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAccessToken: (accessToken) => dispatch(setAccessToken(accessToken)),
    sendFacebookPostRequest: (accessToken, body, successMessage) => dispatch(sendFacebookPostRequest(accessToken, body, successMessage)),
    switchTab: (tabName) => dispatch(switchTab(tabName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

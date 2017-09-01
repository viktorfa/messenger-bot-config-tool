import React from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import MainComponent from './MainComponent';
import PersistentMenu from '../../src/models/PersistentMenu';
import GreetingText from '../../src/models/GreetingText';
import GetStartedButton from '../../src/models/GetStartedButton';

const setAccessToken = (accessToken) => {
  return {type: 'SET_ACCESS_TOKEN', accessToken};
};

/**
 * Sends a request to the Facebook API to change the bot config so that the live Messenger bot changes. Updates the
 * state to reflect the status of the response.
 * @param accessToken
 * @param body
 * @param successMessage
 * @returns {function(*)}
 */
const sendFacebookPostRequest = (accessToken, body, successMessage) => {
  return (dispatch) => {
    dispatch({type: 'START_SEND_FACEBOOK_HTTP_REQUEST'});
    fetch(`https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw "Something wrong with the request";
    }).then(json => {
      console.log(json);
      return dispatch({type: 'SEND_FACEBOOK_HTTP_REQUEST_FINISH', message: successMessage, messageStatus: 'success'})
    }).catch(error => {
      console.log(error);
      return dispatch({
        type: 'SEND_FACEBOOK_HTTP_REQUEST_FINISH',
        message: 'Something went wrong',
        messageStatus: 'error'
      });
    });
  };
};

const switchTab = (tabName) => {
  return dispatch => {
    dispatch(push(`/main/${tabName}`));
  }
};

/**
 * Simply fetches the bot config from the Facebook API without changing state.
 * @param accessToken
 * @returns {Promise}
 */
const fetchCurrentBotConfig = (accessToken) => {
  return new Promise((resolve, reject) => {
    return fetch(`https://graph.facebook.com/v2.6/me/messenger_profile?fields=get_started,persistent_menu,greeting&access_token=${accessToken}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw "Something wrong with the request";
      })
      .then(json => {
        console.log(json);
        resolve(json);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

/**
 * Updates the state to contain a bot config. Note that this does not update the config the user is currently editing,
 * it simply stores/caches it somewhere it is hidden from the UI.
 * @param config
 * @returns {{type: string, persistentMenu: Array, getStarted: (get_started|{payload}), greeting: (*|Array)}}
 */
const setCurrentBotConfig = (config) => {
  return {
    type: 'SET_CURRENT_BOT_CONFIG_STATE',
    persistentMenu: config.persistent_menu,
    getStarted: config.get_started,
    greeting: config.greeting,
  }
};

/**
 * Fetches the latest bot config from the Facebook API and updates the state to reflect whether the access token is
 * valid or not. Optionally dispatches a callback after the config is loaded.
 * @param accessToken
 * @param successMessage
 * @param callback
 * @returns {function(*)}
 */
const loadCurrentBotConfig = (accessToken, successMessage, callback) => {
  return dispatch => {
    dispatch({type: 'START_SEND_FACEBOOK_HTTP_REQUEST'});
    fetchCurrentBotConfig(accessToken).then(json => {
      console.log(json);
      const config = json.data[0];
      dispatch({
        type: 'SEND_FACEBOOK_HTTP_REQUEST_FINISH',
        message: successMessage || 'Loaded successfully',
        messageStatus: 'success'
      });
      dispatch(setCurrentBotConfig(config));
      if (callback) {
        dispatch(callback());
      }
    }).catch(error => {
      console.log(error);
      dispatch({type: 'SEND_FACEBOOK_HTTP_REQUEST_FINISH', message: 'Something went wrong', messageStatus: 'error'});
      dispatch({type: 'SET_ACCESS_TOKEN_INVALID'});
    });
  };
};

/**
 * Fetches the latest bot config from the Facebook API and updates the state of the current persistent menu to the one
 * fetched from Facebook.
 * @param accessToken
 * @returns {function(*, *)}
 */
const loadCurrentPersistentMenu = (accessToken) => {
  return (dispatch, getState) => {
    dispatch(loadCurrentBotConfig(accessToken, 'Persistent menu loaded successfully', () => {
      let currentPersistentMenu = getState().mainReducer.currentPersistentMenu ? getState().mainReducer.currentPersistentMenu[0] : null;
      return {
        type: 'SET_PERSISTENT_MENU',
        persistentMenu: PersistentMenu.constructFromPrevious(currentPersistentMenu)
      }
    }));
  };
};

const loadCurrentGreetingText = (accessToken) => {
  return (dispatch, getState) => {
    dispatch(loadCurrentBotConfig(accessToken, 'Greeting text loaded successfully', () => {
      let currentGreeting = getState().mainReducer.currentGreeting ? getState().mainReducer.currentGreeting[0] : null;
      return {
        type: 'SET_GREETING_TEXT',
        greetingText: GreetingText.constructFromPrevious(currentGreeting)
      }
    }));
  };
};

const loadCurrentGetStartedButton = (accessToken) => {
  return (dispatch, getState) => {
    dispatch(loadCurrentBotConfig(accessToken, 'Get started button loaded successfully', () => {
      let currentGetStarted = getState().mainReducer.currentGetStarted;
      return {
        type: 'SET_GET_STARTED_BUTTON',
        getStartedButton: GetStartedButton.constructFromPrevious(currentGetStarted)
      }
    }));
  };
};

const sendFacebookDeleteRequest = (accessToken, field, successMessage) => {
  const body = {
    fields: [field]
  };
  return dispatch => {
    dispatch({type: 'START_SEND_FACEBOOK_HTTP_REQUEST'});
    fetch(`https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${accessToken}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw "Something wrong with the request";
    }).then(json => {
      console.log(json);
      return dispatch({
        type: 'SEND_FACEBOOK_HTTP_REQUEST_FINISH',
        message: successMessage || 'Successfully deleted',
        messageStatus: 'success'
      })
    }).catch(error => {
      console.log(error);
      return dispatch({
        type: 'SEND_FACEBOOK_HTTP_REQUEST_FINISH',
        message: 'Something went wrong',
        messageStatus: 'error'
      });
    });
  }
};

const mapStateToProps = (state) => {
  return {
    main: state.mainReducer,
    currentTab: state.mainReducer.currentTab,
    persistentMenu: state.persistentMenuReducer,
    getStartedButton: state.getStartedReducer,
    greetingText: state.greetingTextReducer,
    location: state.routerReducer.location
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAccessToken: (accessToken) => dispatch(setAccessToken(accessToken)),
    sendFacebookPostRequest: (accessToken, body, successMessage) => dispatch(sendFacebookPostRequest(accessToken, body, successMessage)),
    switchTab: (tabName) => dispatch(switchTab(tabName)),
    loadCurrentBotConfig: (accessToken, successMessage) => dispatch(loadCurrentBotConfig(accessToken, successMessage)),
    loadCurrentPersistentMenu: (accessToken) => dispatch(loadCurrentPersistentMenu(accessToken)),
    loadCurrentGreetingText: (accessToken) => dispatch(loadCurrentGreetingText(accessToken)),
    loadCurrentGetStartedButton: (accessToken) => dispatch(loadCurrentGetStartedButton(accessToken)),
    sendFacebookDeleteRequest: (accessToken, field, successMessage) => dispatch(sendFacebookDeleteRequest(accessToken, field, successMessage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

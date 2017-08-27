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
import {isBoolean} from 'lodash';
import PersistentMenuContainer from '../PersistentMenu/PersistentMenuContainer';
import GetStartedContainer from '../GetStarted/GetStartedContainer';
import GreetingTextContainer from '../GreetingText/GreetingTextContainer';
import MessageComponent from '../Util/MessageComponent';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendPersistentMenuRequest(event) {
    event.preventDefault();
    const accessToken = this.props.main.accessToken;
    const requestBody = this.props.persistentMenu.persistentMenu.createBodyForRequest();
    this.props.sendFacebookPostRequest(accessToken, requestBody, 'Persistent menu successfully updated');
  }

  sendGetStartedButtonRequest(event) {
    event.preventDefault();
    const accessToken = this.props.main.accessToken;
    const requestBody = this.props.getStartedButton.getStartedButton.createBodyForRequest();
    this.props.sendFacebookPostRequest(accessToken, requestBody, 'Get started button successfully updated');
  }

  sendGreetingTextRequest(event) {
    event.preventDefault();
    const accessToken = this.props.main.accessToken;
    const requestBody = this.props.greetingText.greetingText.createBodyForRequest();
    this.props.sendFacebookPostRequest(accessToken, requestBody, 'Greeting text successfully updated');
  }

  accessTokenChange(event) {
    event.preventDefault();
    this.props.setAccessToken(event.target.value);
  }

  switchTab(event, tabName) {
    event.preventDefault();
    this.props.switchTab(tabName);
  }

  clickValidateToken(event) {
    event.preventDefault();
    this.props.loadCurrentBotConfig(this.props.main.accessToken, 'Access token is valid :)');
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  };

  componentDidUpdate() {
    componentHandler.upgradeDom();
  };

  render() {
    return (
      <div>
        {
          this.props.main.loading &&
          <div style={{display: 'flex', justifyContent: 'center', position: 'fixed', left: '0'}}>
            <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate" style={{width: '100vw'}}>
            </div>
          </div>
        }
        {
          this.props.main.message &&
          <MessageComponent timeout={2000} messageText={this.props.main.message} messageId={this.props.main.messageId}/>
        }

        <div>
          <form onSubmit={event => event.preventDefault()}>
            <div className="mdl-textfield mdl-js-textfield" style={{width: '100%'}}>
              <label htmlFor="access-token" className="mdl-textfield__label">Your access token</label>
              <input type="text" id="access-token" className="mdl-textfield__input" value={this.props.main.accessToken}
                     onChange={event => this.accessTokenChange(event)}/>
            </div>
          </form>
          <button className="mdl-button mdl-js-button"
                  onClick={event => this.clickValidateToken(event)}
                  disabled={this.props.main.accessTokenIsValid || !this.props.main.accessToken}>
            Validate token
          </button>
          { this.props.main.accessTokenIsValid === true &&
          <span className="mdl-chip mdl-color--green-300">
            <span className="mdl-chip__text">Access token is valid</span>
          </span>
          ||
          isBoolean(this.props.main.accessTokenIsValid) && this.props.main.accessTokenIsValid === false &&
          <span className="mdl-chip mdl-color--red-300">
            <span className="mdl-chip__text">Access token is not valid</span>
          </span>
          ||
          <span className="mdl-chip mdl-color--orange-300">
            <span className="mdl-chip__text">Access token is not validated</span>
          </span>
          }
        </div>
        <div>
          <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
            <div className="mdl-tabs__tab-bar">
              <a href="#get-started"
                 className={`mdl-tabs__tab ${this.props.location.pathname === '/main/get-started' ? 'is-active' : ''}`}
                 onClick={event => this.switchTab(event, 'get-started')}>Get started</a>
              <a href="#persistent-menu"
                 className={`mdl-tabs__tab ${this.props.location.pathname === '/main/persistent-menu' ? 'is-active' : ''}`}
                 onClick={event => this.switchTab(event, 'persistent-menu')}>Persistent menu</a>
            </div>
          </div>
        </div>
        {
          this.props.location.pathname === '/main/persistent-menu' &&
          <div>
            <button className="mdl-button mdl-js-button" onClick={event => this.sendPersistentMenuRequest(event)}
                    disabled={!this.props.main.accessToken}>
              Send persistent menu request
            </button>
            <PersistentMenuContainer/>
          </div>
          ||
          this.props.location.pathname === '/main/get-started' &&
          <div>
            <div className="mdl-grid" style={{justifyContent: 'space-between'}}>
              <div className="mdl-cell mdl-cell--4-col-tablet">
                <button className="mdl-button mdl-js-button" onClick={event => this.sendGetStartedButtonRequest(event)}
                        disabled={!this.props.main.accessToken}>
                  Send get started button request
                </button>
                <GetStartedContainer/>
              </div>
              <div className="mdl-cell mdl-cell--4-col-tablet">
                <button className="mdl-button mdl-js-button" onClick={event => this.sendGreetingTextRequest(event)}
                        disabled={!this.props.main.accessToken}>
                  Send greeting text request
                </button>
                <GreetingTextContainer/>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default MainComponent;

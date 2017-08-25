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
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import PersistentMenuContainer from '../PersistentMenu/PersistentMenuContainer';
import GetStartedContainer from '../GetStarted/GetStartedContainer';
import GreetingTextContainer from '../GreetingText/GreetingTextContainer';

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
          this.props.main.loading ?
            <h4>Loading ...</h4>
            :
            ''
        }
        <h5>{this.props.main.message}</h5>
        <div>
          <p>
            Current access token: {this.props.main.accessToken}
          </p>
          <form onSubmit={event => event.preventDefault()}>
            <label htmlFor="access-token">Your access token</label>
            <input type="text" id="access-token" value={this.props.main.accessToken}
                   onChange={event => this.accessTokenChange(event)}/>
          </form>
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
          this.props.location.pathname === '/main/persistent-menu' ?
            <div>
              <button onClick={event => this.sendPersistentMenuRequest(event)} disabled={!this.props.main.accessToken}>
                Send persistent menu request
              </button>
              <PersistentMenuContainer/>
            </div>
            :
            this.props.location.pathname === '/main/get-started' ?
              <div>
                <button onClick={event => this.sendGetStartedButtonRequest(event)}
                        disabled={!this.props.main.accessToken}>
                  Send get started button request
                </button>
                <button onClick={event => this.sendGreetingTextRequest(event)} disabled={!this.props.main.accessToken}>
                  Send greeting text request
                </button>
                <GetStartedContainer/>
                <GreetingTextContainer/>
              </div>
              :
              ''
        }
      </div>
    )
  }
}

export default MainComponent;

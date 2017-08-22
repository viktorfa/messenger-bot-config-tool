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
import PersistentMenuContainer from '../PersistentMenu/PersistentMenuContainer';
import GetStartedContainer from '../GetStarted/GetStartedContainer';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendPersistentMenuRequest(event) {
    event.preventDefault();
    const accessToken = this.props.main.accessToken;
    const requestBody = this.props.persistentMenu.persistentMenu.createBodyForRequest();
    this.props.sendPersistentMenuRequest(accessToken, requestBody);
  }

  sendGetStartedButtonRequest(event) {
    event.preventDefault();
    const accessToken = this.props.main.accessToken;
    const requestBody = this.props.getStartedButton.getStartedButton.createBodyForRequest();
    console.log("REQUEST BODY");
    console.log(requestBody);
    console.log(JSON.stringify(requestBody));
    this.props.sendGetStartedButtonRequest(accessToken, requestBody);
  }

  accessTokenChange(event) {
    event.preventDefault();
    this.props.setAccessToken(event.target.value);
  }

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
            <input type="text" id="access-token" onChange={event => this.accessTokenChange(event)}/>
          </form>
          <button onClick={event => this.sendPersistentMenuRequest(event)}>
            Send persistent menu request
          </button>
          <button onClick={event => this.sendGetStartedButtonRequest(event)}>
            Send get started button request
          </button>
        </div>
        <GetStartedContainer/>
        <PersistentMenuContainer/>
      </div>
    )
  }
}

export default MainComponent;

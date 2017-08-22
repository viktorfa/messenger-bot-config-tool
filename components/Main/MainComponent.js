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
import fetch from 'isomorphic-fetch';
import PersistentMenuContainer from '../PersistentMenu/PersistentMenuContainer';

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
    /*
    fetch(`https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
    */
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
        </div>
        <PersistentMenuContainer persistentMenu={this.props.persistentMenu}/>
      </div>
    )
  }
}

export default MainComponent;

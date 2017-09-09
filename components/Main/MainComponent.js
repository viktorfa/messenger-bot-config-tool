import React from 'react';
import {isBoolean} from 'lodash';
import PersistentMenuContainer from '../PersistentMenu/PersistentMenuContainer';
import PersistentMenuRequestButtons from '../PersistentMenu/PersistentMenuRequestButtons';
import GetStartedContainer from '../GetStarted/GetStartedContainer';
import GetStartedRequestButtons from '../GetStarted/GetStartedRequestButtons';
import GreetingTextContainer from '../GreetingText/GreetingTextContainer';
import GreetingTextRequestButtons from '../GreetingText/GreetingTextRequestButtons';
import WhitelistedDomainsContainer from '../WhitelistedDomains/WhitelistedDomainsContainer';
import WhitelistedDomainsRequestButtons from '../WhitelistedDomains/WhitelistedDomainsRequestButtons';
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

  sendWhitelistedDomainsRequest(event) {
    event.preventDefault();
    const accessToken = this.props.main.accessToken;
    const requestBody = this.props.whitelistedDomains.whitelistedDomains.createBodyForRequest();
    this.props.sendFacebookPostRequest(accessToken, requestBody, 'Whitelisted domains successfully updated');
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

  loadCurrentPersistentMenu(event) {
    event.preventDefault();
    this.props.loadCurrentPersistentMenu(this.props.main.accessToken);
  }

  loadCurrentGetStartedButton(event) {
    event.preventDefault();
    this.props.loadCurrentGetStartedButton(this.props.main.accessToken);
  }

  loadCurrentGreetingText(event) {
    event.preventDefault();
    this.props.loadCurrentGreetingText(this.props.main.accessToken);
  }

  loadCurrentWhitelistedDomains(event) {
    event.preventDefault();
    this.props.loadCurrentWhitelistedDomains(this.props.main.accessToken);
  }

  deleteExistingPersistentMenu(event) {
    event.preventDefault();
    this.props.sendFacebookDeleteRequest(this.props.main.accessToken, 'persistent_menu', 'Successfully deleted existing menu from the bot.');
  }

  deleteExistingGetStartedButton(event) {
    event.preventDefault();
    this.props.sendFacebookDeleteRequest(this.props.main.accessToken, 'get_started', 'Successfully deleted existing get started from the bot.');
  }

  deleteExistingGreetingText(event) {
    event.preventDefault();
    this.props.sendFacebookDeleteRequest(this.props.main.accessToken, 'greeting', 'Successfully deleted existing greeting from the bot.');
  }

  deleteExistingWhitelistedDomains(event) {
    event.preventDefault();
    this.props.sendFacebookDeleteRequest(this.props.main.accessToken, 'whitelisted_domains', 'Successfully deleted existing whitelisted domains from the bot.');
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
          <MessageComponent timeout={2000}
                            messageText={this.props.main.message}
                            messageId={this.props.main.messageId}
                            messageStatus={this.props.main.messageStatus}
          />
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
              <a href="#greeting-text"
                 className={`mdl-tabs__tab ${this.props.location.pathname === '/main/greeting-text' ? 'is-active' : ''}`}
                 onClick={event => this.switchTab(event, 'greeting-text')}>Greeting text</a>
              <a href="#get-started"
                 className={`mdl-tabs__tab ${this.props.location.pathname === '/main/get-started' ? 'is-active' : ''}`}
                 onClick={event => this.switchTab(event, 'get-started')}>Get started</a>
              <a href="#persistent-menu"
                 className={`mdl-tabs__tab ${this.props.location.pathname === '/main/persistent-menu' ? 'is-active' : ''}`}
                 onClick={event => this.switchTab(event, 'persistent-menu')}>Persistent menu</a>
              <a href="#whitelisted-domains"
                 className={`mdl-tabs__tab ${this.props.location.pathname === '/main/whitelisted-domains' ? 'is-active' : ''}`}
                 onClick={event => this.switchTab(event, 'whitelisted-domains')}>Whitelisted domains</a>
            </div>
          </div>
        </div>
        {
          this.props.location.pathname === '/main/greeting-text' &&
          <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
            <GreetingTextRequestButtons disabled={!this.props.main.accessTokenIsValid}
                                        loadCurrentGreetingText={this.loadCurrentGreetingText.bind(this)}
                                        sendGreetingTextRequest={this.sendGreetingTextRequest.bind(this)}
                                        deleteExistingGreetingText={this.deleteExistingGreetingText.bind(this)}
            />
            <GreetingTextContainer/>
          </div>
          ||
          this.props.location.pathname === '/main/get-started' &&
          <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
            <GetStartedRequestButtons disabled={!this.props.main.accessTokenIsValid}
                                      loadCurrentGetStartedButton={this.loadCurrentGetStartedButton.bind(this)}
                                      sendGetStartedRequest={this.sendGetStartedButtonRequest.bind(this)}
                                      deleteExistingGetStartedButton={this.deleteExistingGetStartedButton.bind(this)}
            />
            <GetStartedContainer/>
          </div>
          ||
          this.props.location.pathname === '/main/persistent-menu' &&
          <div>
            <PersistentMenuRequestButtons disabled={!this.props.main.accessTokenIsValid}
                                          loadCurrentPersistentMenu={this.loadCurrentPersistentMenu.bind(this)}
                                          sendPersistentMenuRequest={this.sendPersistentMenuRequest.bind(this)}
                                          deleteExistingPersistentMenu={this.deleteExistingPersistentMenu.bind(this)}
            />
            <PersistentMenuContainer/>
          </div>
          ||
          this.props.location.pathname === '/main/whitelisted-domains' &&
          <div>
            <WhitelistedDomainsRequestButtons disabled={!this.props.main.accessTokenIsValid}
                                              loadCurrentWhitelistedDomains={this.loadCurrentWhitelistedDomains.bind(this)}
                                              sendWhitelistedDomainsRequest={this.sendWhitelistedDomainsRequest.bind(this)}
                                              deleteExistingWhitelistedDomains={this.deleteExistingWhitelistedDomains.bind(this)}
            />
            <WhitelistedDomainsContainer/>
          </div>
        }
      </div>
    )
  }
}

export default MainComponent;

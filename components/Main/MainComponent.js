import React from 'react';
import {isBoolean} from 'lodash';
import PersistentMenuContainer from '../PersistentMenu/PersistentMenuContainer';
import GetStartedContainer from '../GetStarted/GetStartedContainer';
import GreetingTextContainer from '../GreetingText/GreetingTextContainer';
import WhitelistedDomainsContainer from '../WhitelistedDomains/WhitelistedDomainsContainer';
import MessageComponent from '../Util/MessageComponent';
import MBCRequestButtonsMenu from '../Util/MBCRequestButtonsMenu';
import ConfigFields from '../../src/models/ConfigFields';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  updateConfigField(event, field) {
    event.preventDefault();
    let configObject;
    switch (field) {
      case ConfigFields.PERSISTENT_MENU:
        configObject = this.props.persistentMenu.persistentMenu;
        break;
      case ConfigFields.GET_STARTED:
        configObject = this.props.getStartedButton.getStartedButton;
        break;
      case ConfigFields.GREETING:
        configObject = this.props.greetingText.greetingText;
        break;
      case ConfigFields.WHITELISTED_DOMAINS:
        configObject = this.props.whitelistedDomains.whitelistedDomains;
        break;
      default:
        throw new Error(`Invalid config field: ${field}`);
    }
    this.props.updateConfigField(this.props.main.accessToken, field, configObject);
  }

  loadConfigField(event, field) {
    event.preventDefault();
    this.props.loadConfigField(this.props.main.accessToken, field);
  }

  deleteConfigField(event, field) {
    event.preventDefault();
    this.props.deleteConfigField(this.props.main.accessToken, field);
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
            <MBCRequestButtonsMenu
              fieldName="Greeting text"
              updateHandler={event => this.updateConfigField(event, ConfigFields.GREETING)}
              deleteHandler={event => this.deleteConfigField(event, ConfigFields.GREETING)}
              loadHandler={event => this.loadConfigField(event, ConfigFields.GREETING)}
              tokenIsValidated={!!this.props.main.accessTokenIsValid}
            />
            <GreetingTextContainer/>
          </div>
          ||
          this.props.location.pathname === '/main/get-started' &&
          <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
            <MBCRequestButtonsMenu
              fieldName="Get started"
              updateHandler={event => this.updateConfigField(event, ConfigFields.GET_STARTED)}
              deleteHandler={event => this.deleteConfigField(event, ConfigFields.GET_STARTED)}
              loadHandler={event => this.loadConfigField(event, ConfigFields.GET_STARTED)}
              tokenIsValidated={!!this.props.main.accessTokenIsValid}
            />
            <GetStartedContainer/>
          </div>
          ||
          this.props.location.pathname === '/main/persistent-menu' &&
          <div>
            <MBCRequestButtonsMenu
              fieldName="Persistent menu"
              updateHandler={event => this.updateConfigField(event, ConfigFields.PERSISTENT_MENU)}
              deleteHandler={event => this.deleteConfigField(event, ConfigFields.PERSISTENT_MENU)}
              loadHandler={event => this.loadConfigField(event, ConfigFields.PERSISTENT_MENU)}
              tokenIsValidated={!!this.props.main.accessTokenIsValid}
            />
            <PersistentMenuContainer/>
          </div>
          ||
          this.props.location.pathname === '/main/whitelisted-domains' &&
          <div>
            <MBCRequestButtonsMenu
              fieldName="Whitelisted domains"
              updateHandler={event => this.updateConfigField(event, ConfigFields.WHITELISTED_DOMAINS)}
              deleteHandler={event => this.deleteConfigField(event, ConfigFields.WHITELISTED_DOMAINS)}
              loadHandler={event => this.loadConfigField(event, ConfigFields.WHITELISTED_DOMAINS)}
              tokenIsValidated={!!this.props.main.accessTokenIsValid}
            />
            <WhitelistedDomainsContainer/>
          </div>
        }
      </div>
    )
  }
}

export default MainComponent;

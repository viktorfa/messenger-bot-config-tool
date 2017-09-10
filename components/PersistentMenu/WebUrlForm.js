import React from "react";
import PropTypes from 'prop-types';
import {isNil} from 'lodash';

class WebUrlForm extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  };

  componentDidUpdate() {
    componentHandler.upgradeDom();
  };

  clickMessengerExtensionsSwitch(event) {
    const value = this.props.menuItem.messenger_extensions !== true;
    this.updateOptions('messenger_extensions', value);
  }

  clickWebviewShareSwitch(event) {
    const value = this.props.menuItem.webview_share_button === 'hide' ? '' : 'hide';
    this.updateOptions('webview_share_button', value);
  }

  clickWebviewHeightRatioButton(event) {
    event.preventDefault();
    const value = event.target.value;
    this.updateOptions('webview_height_ratio', value);
  }

  updateOptions(key, value) {
    const options = _.pick(this.props.menuItem, ['webview_height_ratio', 'messenger_extensions', 'webview_share_button']);
    if (!isNil(key) && !isNil(value)) {
      options[key] = value;
      this.props.editOptionFields(options, this.props.menuItem.id);
    } else {
      console.error("Something wrong with the form.");
      console.error(`${key} : ${value}`);
    }
  }

  onFormChange(event) {
    //event.preventDefault();
    console.log(event);
    console.log(event.target);
    const options = _.pick(this.props.menuItem, ['webview_height_ratio', 'messenger_extensions', 'webview_share_button']);
    let key, value;
    if (event.target.type === 'checkbox') {
      key = event.target.id;
      if (event.target.id === 'webview_share_button') {
        value = this.props.menuItem.webview_share_button === 'hide' ? '' : 'hide';
      } else if (event.target.id === 'messenger_extensions') {
        value = this.props.menuItem.messenger_extensions !== true;
      }
    } else if (event.target.type === 'radio') {
      key = 'webview_height_ratio';
      value = event.target.value;
    }
    if (!isNil(key) && !isNil(value)) {
      options[key] = value;
      this.props.editOptionFields(options, this.props.menuItem.id);
    } else {
      console.error("Something wrong with the form.");
      console.error(`${key} : ${value}`);
    }
  }

  render() {
    return (
      <div>
        <div className="mdl-textfield mdl-js-textfield">
          <label htmlFor="web_url" className="mdl-textfield__label">{'http://example.com'}</label>
          <input
            className="mdl-textfield__input"
            type="url"
            id="web-url"
            value={this.props.menuItem.url}
            onChange={event => this.props.editWebUrl(event)}

          />
        </div>
        <div>
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="messenger_extensions">
            <input type="checkbox" id="messenger_extensions" className="mdl-switch__input"
                   checked={this.props.menuItem.messenger_extensions === true}
                   value={'on'}
                   onClick={event => this.clickMessengerExtensionsSwitch(event)}/>
            <span className="mdl-switch__label">Use Messenger extensions</span>
          </label>
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="webview_share_button">
            <input type="checkbox" id="webview_share_button" className="mdl-switch__input"
                   checked={this.props.menuItem.webview_share_button === 'hide'}
                   onClick={event => this.clickWebviewShareSwitch(event)}/>
            <span className="mdl-switch__label">Hide share button</span>
          </label>
          <form onChange={event => this.clickWebviewHeightRatioButton(event)}>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="webview-full">
              <input type="radio" id="webview-full" className="mdl-radio__button" name="webview_height_ratio"
                     value="full" checked={this.props.menuItem.webview_height_ratio === 'full'}/>
              <span className="mdl-radio__label">Webview full</span>
            </label>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="webview-tall">
              <input type="radio" id="webview-tall" className="mdl-radio__button" name="webview_height_ratio"
                     value="tall" checked={this.props.menuItem.webview_height_ratio === 'tall'}/>
              <span className="mdl-radio__label">Webview tall</span>
            </label>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="webview-compact">
              <input type="radio" id="webview-compact" className="mdl-radio__button" name="webview_height_ratio"
                     value="compact" checked={this.props.menuItem.webview_height_ratio === 'compact'}/>
              <span className="mdl-radio__label">Webview compact</span>
            </label>
          </form>
          <div className="mdl-textfield mdl-js-textfield">
            <label htmlFor="fallback_url" className="mdl-textfield__label">{'Optional fallback url'}</label>
            <input
              className="mdl-textfield__input"
              type="url"
              id="fallback_url"
              value={this.props.menuItem.fallback_url}
              onChange={event => this.props.editFallbackUrl(event)}
            />
          </div>
        </div>
        <pre>{JSON.stringify(this.props.menuItem, null, 2)}</pre>
      </div>
    )
  }
}

WebUrlForm.propTypes = {
  menuItem: PropTypes.object.isRequired,
  editWebUrl: PropTypes.func.isRequired,
  editFallbackUrl: PropTypes.func.isRequired,
  editOptionFields: PropTypes.func.isRequired,
};

export default WebUrlForm;

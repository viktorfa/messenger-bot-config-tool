import React from "react";
import PropTypes from 'prop-types';
import {isNil} from 'lodash';
import MBCCheckbox from '../Util/MBCCheckbox';

class WebUrlForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMessengerExtensions = this.toggleMessengerExtensions.bind(this);
    this.toggleWebviewShare = this.toggleWebviewShare.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  };

  componentDidUpdate() {
    componentHandler.upgradeDom();
  };

  toggleMessengerExtensions() {
    const value = this.props.menuItem.messenger_extensions !== true;
    this.updateOptions('messenger_extensions', value);
  }

  toggleWebviewShare() {
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
          <MBCCheckbox handleClick={this.toggleMessengerExtensions}
                       checked={this.props.menuItem.messenger_extensions === true}
                       labelText={'Use Messenger extensions'}/>
          <br/>
          <MBCCheckbox handleClick={this.toggleWebviewShare}
                       checked={this.props.menuItem.webview_share_button === 'hide'}
                       labelText={'Hide share button'}/>
          <br/>
          <form onChange={event => this.clickWebviewHeightRatioButton(event)}>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="webview-full">
              <input type="radio" id="webview-full" className="mdl-radio__button" name="webview_height_ratio"
                     value="full" checked={this.props.menuItem.webview_height_ratio === 'full'}/>
              <span className="mdl-radio__label">Full (100%)</span>
            </label>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="webview-tall">
              <input type="radio" id="webview-tall" className="mdl-radio__button" name="webview_height_ratio"
                     value="tall" checked={this.props.menuItem.webview_height_ratio === 'tall'}/>
              <span className="mdl-radio__label">Tall (70%)</span>
            </label>
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="webview-compact">
              <input type="radio" id="webview-compact" className="mdl-radio__button" name="webview_height_ratio"
                     value="compact" checked={this.props.menuItem.webview_height_ratio === 'compact'}/>
              <span className="mdl-radio__label">Compact (35%)</span>
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

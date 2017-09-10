import React from 'react'
import PayloadInput from '../Util/PayloadInput';
import InputLengthChip from '../Util/InputLengthChip';
import WebUrlForm from './WebUrlForm';
class AddMenuItemForm extends React.Component {

  editTitle(event) {
    event.preventDefault();
    this.props.editTitle(event.target.value, this.props.menuItem.id);
  }

  clickItemType(event, menuItemType) {
    event.preventDefault();
    console.log(event);
    this.props.editMenuItemType(menuItemType, this.props.menuItem.id);
  }

  clickEditMenu(event) {
    event.preventDefault();
    if (this.props.menuItem.level === 1) {
      this.startEditSubMenu(this.props.menuItem.id)
    } else if (this.props.menuItem.level === 2) {
      this.startEditSubSubMenu(this.props.menuItem.id)
    }
  }

  startEditSubMenu() {
    this.props.startEditSubMenu(this.props.menuItem.id);
  }

  startEditSubSubMenu() {
    this.props.startEditSubSubMenu(this.props.menuItem.id);
  }

  editPayload(event) {
    event.preventDefault();
    this.props.editPayload(event.target.value, this.props.menuItem.id);
  }

  editWebUrl(event) {
    event.preventDefault();
    this.props.editWebUrl(event.target.value, this.props.menuItem.id);
  }

  editFallbackUrl(event) {
    event.preventDefault();
    this.props.editFallbackUrl(event.target.value, this.props.menuItem.id);
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
        <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
          <div className="mdl-tabs__tab-bar">
            <a href="#"
               className={`mdl-tabs__tab ${this.props.menuItem.type === 'postback' ? 'is-active' : ''}`}
               onClick={event => this.clickItemType(event, 'postback')}>
              Postback
            </a>
            <a href="#"
               className={`mdl-tabs__tab ${this.props.menuItem.type === 'web_url' ? 'is-active' : ''}`}
               onClick={event => this.clickItemType(event, 'web_url')}>
              Url
            </a>
            {
              this.props.menuItem.level < 3 &&
              <a href="#"
                 className={`mdl-tabs__tab ${this.props.menuItem.type === 'nested' ? 'is-active' : ''}`}
                 onClick={event => this.clickItemType(event, 'nested')}>
                Menu
              </a>
            }
          </div>
        </div>
        <div style={{display: 'flex', flexFlow: 'column'}}>
          <div className="mdl-textfield mdl-js-textfield">
            <label htmlFor="menu-item-title" className="mdl-textfield__label">Title</label>
            <input type="text"
                   id="menu-item-title"
                   className="mdl-textfield__input"
                   onChange={event => this.editTitle(event)}
                   value={this.props.menuItem.title}
                   maxLength={30}
                   autoFocus/>
            <InputLengthChip maxLength={30} inputText={this.props.menuItem.title}/>
          </div>
          {
            this.props.menuItem.type === 'web_url' ?
              <WebUrlForm menuItem={this.props.menuItem}
                          editWebUrl={this.editWebUrl.bind(this)}
                          editFallbackUrl={this.editFallbackUrl.bind(this)}
                          editOptionFields={this.props.editOptionFields}/>
              : this.props.menuItem.type === 'postback' ?
              <PayloadInput payload={this.props.menuItem.payload} editPayload={this.editPayload.bind(this)}/>
              : this.props.menuItem.type === 'nested' ?
              <button className="mdl-button mdl-js-button" onClick={event => this.clickEditMenu(event)}>
                Edit menu
              </button>
              :
              ''
          }
        </div>
      </div>
    )
  }
}

export default AddMenuItemForm;

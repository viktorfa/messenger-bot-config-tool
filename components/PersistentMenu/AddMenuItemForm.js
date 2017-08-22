import React from 'react'
import ExpandedSubMenuComponent from './ExpandedSubMenuComponent';

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

  editPayload(event) {
    event.preventDefault();
    this.props.editPayload(event.target.value, this.props.menuItem.id);
  }

  editWebUrl(event) {
    event.preventDefault();
    this.props.editWebUrl(event.target.value, this.props.menuItem.id);
  }

  render() {
    return (
      <div>
        <p>This is the AddMenuItemForm component</p>
        <code>
          {JSON.stringify(this.props.menuItem)}
        </code>
        <form onSubmit={event => this.submitForm(event)}>
          <div>
            <button
              onClick={event => this.clickItemType(event, 'postback')}
              disabled={this.props.menuItem.type === 'postback'}
            >
              Postback
            </button>
            <button
              onClick={event => this.clickItemType(event, 'web_url')}
              disabled={this.props.menuItem.type === 'web_url'}
            >
              Url
            </button>
            <button
              onClick={event => this.clickItemType(event, 'nested')}
              disabled={this.props.menuItem.type === 'nested'}
            >
              Menu
            </button>
          </div>
          <input type="text" onChange={event => this.editTitle(event)} value={this.props.menuItem.title}/>
          {
            this.props.menuItem.type === 'web_url' ?
              (
                <div>
                  <input
                    type="url"
                    id="web-url"
                    defaultValue={this.props.menuItem.url || ''}
                    placeholder="https://inneklemtedager.no"
                    onChange={event => this.editWebUrl(event)}
                  />
                </div>
              )
              : this.props.menuItem.type === 'postback' ?
              (
                <div>
                  <input
                    type="text"
                    id="payload"
                    defaultValue={this.props.menuItem.payload || ''}
                    placeholder="PAYLOAD"
                    onChange={event => this.editPayload(event)}
                  />
                </div>
              )
              : this.props.menuItem.type === 'nested' ?
              <ExpandedSubMenuComponent subMenu={this.props.menuItem}/>
              :
              ''
          }
        </form>
      </div>
    )
  }
}

export default AddMenuItemForm;

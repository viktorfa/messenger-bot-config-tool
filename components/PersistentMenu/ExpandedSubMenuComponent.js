import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
import AddMenuItemForm from './AddMenuItemForm';

import {mapDispatchToProps} from './PersistentMenuContainer';

class ExpandedSubMenuComponent extends React.Component {

  clickMenuButton(event, menuButton) {
    event.preventDefault();
    console.log("Clicked menu button");
    this.props.clickMenuItem(menuButton.id);
  }

  clickAddNewMenuItem(event) {
    event.preventDefault();
    console.log("Clicked add new menu item");
    this.props.clickAddNewItem(this.props.subMenu.id)
  }

  deleteMenuItem(event, menuItem) {
    event.preventDefault();
    this.props.deleteMenuItem(menuItem.id);
  }

  render() {
    return (
      <div>
        <p>This is the ExpandedSubMenuComponent</p>
        <code>
        </code>
        <div className="persistent-menu-buttons">
          {
            _.map(this.props.subMenu.children, (menuItem, key) => {
              return (
                <div key={key} className="persistent-menu-button">
                  <button onClick={event => this.clickMenuButton(event, menuItem)}>
                    {menuItem.title || 'Enter title'}
                  </button>
                  <button onClick={event => this.deleteMenuItem(event, menuItem)}>
                    Delete
                  </button>
                </div>
              )
            })
          }
          {
            this.props.subMenu.canAddMenuItem() ?
              <button onClick={event => this.clickAddNewMenuItem(event)}>New Item</button>
              :
              ''
          }
        </div>
        {
          this.props.isEditingSubMenu && _.includes(Object.keys(this.props.subMenu.children), this.props.isEditingSubMenu) ?
            <div>
              <AddMenuItemForm
                menuItem={this.props.subMenu.getMenuItem(this.props.isEditingSubMenu)}
                editTitle={this.props.editTitle}
                editPayload={this.props.editPayload}
                editWebUrl={this.props.editWebUrl}
                editMenuItemType={this.props.editMenuItemType}
                startEditSubMenu={this.props.startEditSubMenu}
                startEditSubSubMenu={this.props.startEditSubSubMenu}
              />
            </div>
            :
            ''
        }
      </div>
    )
  }
}

export default ExpandedSubMenuComponent;

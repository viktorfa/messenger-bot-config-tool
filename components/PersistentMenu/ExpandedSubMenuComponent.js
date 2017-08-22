import React from "react";
import {connect} from 'react-redux';
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

  render() {
    return (
      <div>
        <code>
          {JSON.stringify(this.props)}
        </code>
        <div className="persistent-menu-buttons">
          {
            _.map(this.props.subMenu.children, (menuItem, key) => {
              return (
                <div key={key} className="persistent-menu-button">
                  <button onClick={event => this.clickMenuButton(event, menuItem)}>{menuItem.title}</button>
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
          this.props.isEditingSubMenu ?
            <div>
              <AddMenuItemForm
                editTitle={this.props.editTitle}
                editPayload={this.props.editPayload}
                editWebUrl={this.props.editWebUrl}
                editMenuItemType={this.props.editMenuItemType}
                menuItem={this.props.subMenu.getMenuItem(this.props.isEditingSubMenu)}
              />
            </div>
            :
            ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 return {
 }
};

const ownMapDispatchToProps = (dispatch) => {
  return mapDispatchToProps(dispatch);
};

export default connect(mapStateToProps, ownMapDispatchToProps)(ExpandedSubMenuComponent);

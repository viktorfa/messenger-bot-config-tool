import React from "react";
import _ from 'lodash';
import AddMenuItemForm from './AddMenuItemForm';
import PersistentMenuButton from './PersistentMenuButton';
import s from './styles.css';

class ExpandedSubMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showAddMenuItemForm: false};
    this.addMenuItemFormWrapperRef = null;
  }

  clickAddNewMenuItem(event) {
    event.preventDefault();
    console.log("Clicked add new menu item");
    this.setState({
      addMenuItemFormXPos: `${event.clientX}px`,
      addMenuItemFormYPos: `${event.clientY}px`,
      showAddMenuItemForm: true
    });
    this.props.clickAddNewItem(this.props.subMenu.id);
  }

  clickMenuItem(event, menuButton) {
    event.preventDefault();
    if (event.target.nodeName !== 'BUTTON') {
      this.setState({
        addMenuItemFormXPos: `${event.clientX}px`,
        addMenuItemFormYPos: `${event.clientY}px`,
        showAddMenuItemForm: true
      });
      this.props.clickMenuItem(menuButton.id);
    }
  }

  closeAddMenuItemForm() {
    this.setState({showAddMenuItemForm: false});
  }

  /**
   * Set up listening to all mouse clicks to close add menu item form on click outside the form wrapper.
   * Thanks to Ben Bud https://stackoverflow.com/a/42234988/5441099
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleClickOutside(event) {
    if (this.addMenuItemFormWrapperRef && !this.addMenuItemFormWrapperRef.contains(event.target)) {
      this.closeAddMenuItemForm();
    }
  }

  handleKeyDown(event) {
    if ((event.key === 'Escape' || event.keyCode === 27) && this.addMenuItemFormWrapperRef && !this.addMenuItemFormWrapperRef.contains(event.target)) {
      this.closeAddMenuItemForm();
    }
  }

  setAddMenuItemFormWrapperRef(node) {
    this.addMenuItemFormWrapperRef = node;
  }

  render() {
    return (
      <div>
        <div className={`${s['persistent-menu-buttons']}`}>
          <div className={`${s['persistent-menu-button']} ${s['persistent-menu-header']}`}>
            {
              this.props.subMenu.level === 0 &&
              <div>Menu</div>
              ||
              <div>{this.props.subMenu.title || 'Enter title'}</div>
            }
          </div>
          {
            _.map(this.props.subMenu.children, (menuItem, key) => {
              return <PersistentMenuButton
                key={key}
                menuItem={menuItem}
                clickMenuItem={this.clickMenuItem.bind(this)}
                deleteMenuItem={this.props.deleteMenuItem}
                startEditSubMenu={this.props.startEditSubMenu}
                startEditSubSubMenu={this.props.startEditSubSubMenu}
              />
            })
          }
          {
            this.props.subMenu.canAddMenuItem() ?
              <div className={`${s['persistent-menu-button']} ${s['persistent-menu-delete-button']}`}>
                <button className="mdl-button" onClick={event => this.clickAddNewMenuItem(event)}>
                  New Item
                </button>
              </div>
              :
              ''
          }
        </div>
        {
          this.props.isEditingSubMenu && this.state.showAddMenuItemForm && _.includes(Object.keys(this.props.subMenu.children), this.props.isEditingSubMenu) ?
            <div
              ref={wrapper => this.setAddMenuItemFormWrapperRef(wrapper)}
              className="mdl-shadow--4dp"
              style={{
                position: 'fixed',
                left: this.state.addMenuItemFormXPos,
                top: this.state.addMenuItemFormYPos,
                border: '1px gray solid',
                borderRadius: '5px',
                padding: '10px',
                background: 'white'
              }}
            >
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

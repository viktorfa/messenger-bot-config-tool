import React from 'react';
import ExpandedSubMenuComponent from './ExpandedSubMenuComponent';
import MBCCheckbox from '../Util/MBCCheckbox';

const rootMenuComponent = (props) => {
  return (
    <ExpandedSubMenuComponent
      subMenu={props.persistentMenu.getMenuItem('root')}
      isEditingSubMenu={props.isEditingMenuItem}

      clickMenuItem={props.clickMenuItem}
      clickAddNewItem={props.clickAddNewItem}
      deleteMenuItem={props.deleteMenuItem}
      startEditSubMenu={props.startEditSubMenu}
      startEditSubSubMenu={props.startEditSubMenu}

      editTitle={props.editTitle}
      editPayload={props.editPayload}
      editWebUrl={props.editWebUrl}
      editFallbackUrl={props.editFallbackUrl}
      editOptionFields={props.editOptionFields}
      editMenuItemType={props.editMenuItemType}
    />
  );
};

const subMenuComponent = (props) => {
  return (
    <ExpandedSubMenuComponent
      subMenu={props.persistentMenu.getMenuItem(props.subMenuOpen)}
      isEditingSubMenu={props.isEditingMenuItem}

      clickMenuItem={props.clickMenuItem}
      clickAddNewItem={props.clickAddNewItem}
      deleteMenuItem={props.deleteMenuItem}
      startEditSubMenu={props.startEditSubMenu}
      startEditSubSubMenu={props.startEditSubSubMenu}

      editTitle={props.editTitle}
      editPayload={props.editPayload}
      editWebUrl={props.editWebUrl}
      editFallbackUrl={props.editFallbackUrl}
      editOptionFields={props.editOptionFields}
      editMenuItemType={props.editMenuItemType}
    />
  );
};

const subSubMenuComponent = (props) => {
  return (
    <ExpandedSubMenuComponent
      subMenu={props.persistentMenu.getMenuItem(props.subSubMenuOpen)}
      isEditingSubMenu={props.isEditingMenuItem}

      clickMenuItem={props.clickMenuItem}
      clickAddNewItem={props.clickAddNewItem}
      deleteMenuItem={props.deleteMenuItem}
      startEditSubMenu={props.startEditSubMenu}
      startEditSubSubMenu={props.startEditSubSubMenu}

      editTitle={props.editTitle}
      editPayload={props.editPayload}
      editWebUrl={props.editWebUrl}
      editFallbackUrl={props.editFallbackUrl}
      editOptionFields={props.editOptionFields}
      editMenuItemType={props.editMenuItemType}
    />
  );
};

class PersistentMenuComponent extends React.Component {
  constructor(props) {
    super(props);

    this.toggleComposerInputDisabled = this.toggleComposerInputDisabled.bind(this);
    this.clickSlideMenuView = this.clickSlideMenuView.bind(this);
  }

  clickSlideMenuView(event, level) {
    event.preventDefault();
    this.props.slideMenuView(level);
  }

  toggleComposerInputDisabled() {
    this.props.editComposerInputDisabled(!this.props.persistentMenu.composer_input_disabled);
  }

  showRootMenuLeft = () => {
    return this.props.menuViewLevel !== 1 || !this.props.subSubMenuOpen
  };

  showSubMenuLeft = () => {
    return this.props.menuViewLevel === 1 && this.props.subMenuOpen && this.props.subSubMenuOpen
  };

  showSubMenuRight = () => {
    return this.props.subMenuOpen && (this.props.menuViewLevel !== 1 || !this.props.subSubMenuOpen);
  };

  showSubSubMenuRight = () => {
    return this.props.subSubMenuOpen && this.props.menuViewLevel === 1;
  };

  showSlideLeftButton = () => {
    return this.showSubSubMenuRight();
  };

  showSlideRightButton = () => {
    return this.showRootMenuLeft() && this.props.subSubMenuOpen;
  };

  componentDidMount() {
    componentHandler.upgradeDom();
  };

  componentDidUpdate() {
    componentHandler.upgradeDom();
  };

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}} className="mdl-cell">
          {
            this.showSlideLeftButton() &&
            <button className="mdl-button mdl-button--icon" onClick={event => this.clickSlideMenuView(event, 0)}>
              {'<-'}
            </button>
            ||
            <span></span>
          }
          {
            this.showSlideRightButton() &&
            <button className="mdl-button mdl-button--icon" onClick={event => this.clickSlideMenuView(event, 1)}>
              {'->'}
            </button>
            ||
            <span></span>
          }
        </div>
        <MBCCheckbox handleClick={this.toggleComposerInputDisabled}
                     checked={!this.props.persistentMenu.composer_input_disabled}
                     labelText={'Enable text input'}
        />
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col-tablet mdl-cell--6-col">
            {
              this.showRootMenuLeft() && rootMenuComponent(this.props)
              ||
              this.showSubMenuLeft() && subMenuComponent(this.props)
            }
          </div>
          <div className="mdl-cell mdl-cell--4-col-tablet mdl-cell--6-col">
            <div>
              {
                this.showSubMenuRight() && subMenuComponent(this.props)
                ||
                this.showSubSubMenuRight() && subSubMenuComponent(this.props)
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PersistentMenuComponent;

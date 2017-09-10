/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import _ from 'lodash';
import ExpandedSubMenuComponent from './ExpandedSubMenuComponent';

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
  }

  clickSlideMenuView(event, level) {
    event.preventDefault();
    this.props.slideMenuView(level);
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

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

class PersistentMenuComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="mdl-cell">
          <p>This is the PersistentMenu component</p>
          <code>
            {/*JSON.stringify(this.props)*/}
          </code>
        </div>

        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col-tablet mdl-cell--6-col">
            <div id="persistent-menu">
              <div className="menu-text-input-box">
                <input type="text" disabled placeholder="Write something here..."/>
              </div>
              <ExpandedSubMenuComponent
                subMenu={this.props.persistentMenu.getMenuItem('root')}
                isEditingSubMenu={this.props.isEditingMenuItem}

                clickMenuItem={this.props.clickMenuItem}
                clickAddNewItem={this.props.clickAddNewItem}
                startEditSubMenu={this.props.startEditSubMenu}

                editTitle={this.props.editTitle}
                editPayload={this.props.editPayload}
                editWebUrl={this.props.editWebUrl}
                editMenuItemType={this.props.editMenuItemType}
              />
              <hr/>
              {
                this.props.subMenuOpen ?
                  <div>
                    Another expanded sub menu here {this.props.subMenuOpen}
                    <code>
                      {JSON.stringify(this.props.persistentMenu.getMenuItem(this.props.subMenuOpen))}
                    </code>
                    <ExpandedSubMenuComponent
                      subMenu={this.props.persistentMenu.getMenuItem(this.props.subMenuOpen)}
                      isEditingSubMenu={this.props.isEditingMenuItem}

                      clickMenuItem={this.props.clickMenuItem}
                      clickAddNewItem={this.props.clickAddNewItem}
                      startEditSubMenu={this.props.startEditSubMenu}
                      startEditSubSubMenu={this.props.startEditSubSubMenu}

                      editTitle={this.props.editTitle}
                      editPayload={this.props.editPayload}
                      editWebUrl={this.props.editWebUrl}
                      editMenuItemType={this.props.editMenuItemType}
                    />
                  </div>
                  :
                  ''
              }


            </div>
          </div>
          <div className="mdl-cell mdl-cell--4-col-tablet mdl-cell--6-col">
            <code>på deisann {this.props.isEditingMenuItem}</code>
          </div>
        </div>
      </div>
    )
  }
}

export default PersistentMenuComponent;

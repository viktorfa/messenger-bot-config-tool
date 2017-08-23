/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import persistentMenuReducer from '../src/reducers/persistentMenuReducer';

describe('persistentMenuReducer', () => {

  let state;

  beforeEach(() => {
    state = persistentMenuReducer(undefined, {type: ''});
    deepFreeze(state);
  });

  it('should be able to add a menu item', () => {
    let menuItemsBefore = Object.keys(state.persistentMenu.menuItems).length;
    let parentId = 'root';
    state = persistentMenuReducer(state, {type: 'CLICK_ADD_NEW_ITEM', parentId});
    deepFreeze(state);
    expect(Object.keys(state.persistentMenu.menuItems).length).to.equal(menuItemsBefore + 1)
  });

  it('should be able to add a new sub menu', () => {
    let menuItemsBefore = Object.keys(state.persistentMenu.menuItems).length;
    let parentId = 'root';
    state = persistentMenuReducer(state, {type: 'CLICK_ADD_NEW_ITEM', parentId});
    deepFreeze(state);
    let menuItemId = state.persistentMenu.getMenuItem(state.persistentMenu.idCount).id;
    let menuItemType = 'nested';
    state = persistentMenuReducer(state, {type: 'EDIT_MENU_ITEM_TYPE', menuItemId, menuItemType});
    deepFreeze(state);
    expect(state.persistentMenu.getMenuItem(menuItemId).type).to.equal(menuItemType);
  });
});

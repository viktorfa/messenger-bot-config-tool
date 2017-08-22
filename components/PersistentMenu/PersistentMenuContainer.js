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
import {connect} from 'react-redux';
import PersistentMenuComponent from "./PersistentMenuComponent";



const clickAddNewItem = (parentId) => {
  return {type: 'CLICK_ADD_NEW_ITEM', parentId};
};

const clickMenuItem = (menuItemId) => {
  return {type: 'CLICK_MENU_ITEM', menuItemId};
};

const editTitle = (title, menuItemId) => {
  return {type: 'EDIT_TITLE', title, menuItemId}
};

const editMenuItemType = (menuItemType, menuItemId) => {
  return {type: 'EDIT_MENU_ITEM_TYPE', menuItemType, menuItemId};
};

const editPayload = (payload, menuItemId) => {
  return {type: 'EDIT_PAYLOAD', payload, menuItemId};
};

const editWebUrl = (url, menuItemId) => {
  return {type: 'EDIT_WEB_URL', url, menuItemId};
};


const mapStateToProps = (state) => {
  return {
    persistentMenu: state.persistentMenuReducer.persistentMenu,
    isEditingMenuItem: state.persistentMenuReducer.isEditingMenuItem,
  };
};

export const mapDispatchToProps = (dispatch) => {
  console.log("MAP DISPATCH TO PROPS");
  return {
    clickAddNewItem: (parentId) => dispatch(clickAddNewItem(parentId)),
    clickMenuItem: (menuItemId) => dispatch(clickMenuItem(menuItemId)),
    editTitle: (title, menuItemId) => dispatch(editTitle(title, menuItemId)),
    editMenuItemType: (menuItemType, menuItemId) => dispatch(editMenuItemType(menuItemType, menuItemId)),
    editPayload: (payload, menuItemId) => dispatch(editPayload(payload, menuItemId)),
    editWebUrl: (url, menuItemId) => dispatch(editWebUrl(url, menuItemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersistentMenuComponent);

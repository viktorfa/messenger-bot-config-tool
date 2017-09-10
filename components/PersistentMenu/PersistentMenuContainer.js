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

const editComposerInputDisabled = (composerInputDisabled) => {
  return {type: 'EDIT_COMPOSER_INPUT_DISABLED', composerInputDisabled};
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

const editFallbackUrl = (url, menuItemId) => {
  return {type: 'EDIT_FALLBACK_URL', url, menuItemId};
};

const editOptionFields = (options, menuItemId) => {
  return {type: 'EDIT_OPTION_FIELDS', options, menuItemId};
};

const startEditSubMenu = (menuItemId) => {
  return {type: 'OPEN_SUB_MENU', menuItemId}
};

const startEditSubSubMenu = (menuItemId) => {
  return {type: 'OPEN_SUB_SUB_MENU', menuItemId}
};

const deleteMenuItem = (menuItemId) => {
  return {type: 'DELETE_MENU_ITEM', menuItemId};
};

const slideMenuView = (menuViewLevel) => {
  return {type: 'SLIDE_MENU_VIEW', menuViewLevel};
};

const mapStateToProps = (state) => {
  return {
    persistentMenu: state.persistentMenuReducer.persistentMenu,
    isEditingMenuItem: state.persistentMenuReducer.isEditingMenuItem,
    subMenuOpen: state.persistentMenuReducer.subMenuOpen,
    subSubMenuOpen: state.persistentMenuReducer.subSubMenuOpen,
    menuViewLevel: state.persistentMenuReducer.menuViewLevel,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    clickAddNewItem: (parentId) => dispatch(clickAddNewItem(parentId)),
    clickMenuItem: (menuItemId) => dispatch(clickMenuItem(menuItemId)),
    editComposerInputDisabled: (composerInputDisabled) => dispatch(editComposerInputDisabled(composerInputDisabled)),
    deleteMenuItem: (menuItemId) => dispatch(deleteMenuItem(menuItemId)),
    editTitle: (title, menuItemId) => dispatch(editTitle(title, menuItemId)),
    editMenuItemType: (menuItemType, menuItemId) => dispatch(editMenuItemType(menuItemType, menuItemId)),
    editPayload: (payload, menuItemId) => dispatch(editPayload(payload, menuItemId)),
    editWebUrl: (url, menuItemId) => dispatch(editWebUrl(url, menuItemId)),
    editFallbackUrl: (url, menuItemId) => dispatch(editFallbackUrl(url, menuItemId)),
    editOptionFields: (options, menuItemId) => dispatch(editOptionFields(options, menuItemId)),
    startEditSubMenu: (menuItemId) => dispatch(startEditSubMenu(menuItemId)),
    startEditSubSubMenu: (menuItemId) => dispatch(startEditSubSubMenu(menuItemId)),
    slideMenuView: (menuViewLevel) => dispatch(slideMenuView(menuViewLevel)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersistentMenuComponent);

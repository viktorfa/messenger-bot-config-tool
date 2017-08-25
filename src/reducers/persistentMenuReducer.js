import {cloneDeep, isBoolean} from 'lodash';
import PersistentMenu from "../models/PersistentMenu";
import MenuItem from "../models/MenuItem";

const initialState = {
  foo: 'bar',
  persistentMenu: {
    locale: "default",
    composer_input_disabled: true,
    call_to_actions: [
      {
        title: "My Account",
        type: "nested",
        call_to_actions: [
          {
            title: "Pay Bill",
            type: "postback",
            payload: "PAYBILL_PAYLOAD"
          },
          {
            title: "History",
            type: "postback",
            payload: "HISTORY_PAYLOAD"
          },
          {
            title: "Contact Info",
            type: "postback",
            payload: "CONTACT_INFO_PAYLOAD"
          }
        ]
      },
      {
        type: "web_url",
        title: "Latest News",
        url: "http://petershats.parseapp.com/hat-news",
        webview_height_ratio: "full"
      }
    ]
  }
};

export const getInitialPersistentMenu = () => {
  const initialPersistentMenu = new PersistentMenu();
  const initialRootMenu = initialPersistentMenu.getMenuItem('root');
  const initialSubMenu = new MenuItem('My Account', initialRootMenu, {type: 'nested'});
  const initialMenuItems = [
    initialSubMenu,
    new MenuItem('Latest News', initialRootMenu, {type: 'web_url', url: 'https://inneklemtedager.no'}),
  ];
  initialMenuItems.forEach(menuItem => {
    initialPersistentMenu.addMenuItem(menuItem, 'root')
  });

  const initialSubMenuItems = [
    new MenuItem('Pay Bill', initialSubMenu, {type: 'postback', payload: 'PAYBILL_PAYLOAD'}),
    new MenuItem('History', initialSubMenu, {type: 'postback', payload: 'HISTORY_PAYLOAD'}),
    new MenuItem('Contact Info', initialSubMenu, {type: 'postback', payload: 'CONTACT_INFO_PAYLOAD'}),
  ];

  initialSubMenuItems.forEach(subMenuItem => {
    initialPersistentMenu.addMenuItem(subMenuItem, initialSubMenu.id);
  });

  return initialPersistentMenu;
};

export const getInitialState = () => {
  return {persistentMenu: getInitialPersistentMenu(), foo: 'bar'};
};

const persistentMenuReducer = (state = getInitialState(), action) => {
  let newPersistentMenu;
  let newMenuItem;
  switch (action.type) {
    case 'EDIT_COMPOSER_INPUT_DISABLED':
      if (isBoolean(action.value)) {
        newPersistentMenu = cloneDeep(state.persistentMenu);
        newPersistentMenu.composer_input_disabled = action.value;
        return {...state, persistentMenu: newPersistentMenu};
      } else {
        return state;
      }
    case 'CLICK_ADD_NEW_ITEM':
      newPersistentMenu = cloneDeep(state.persistentMenu);
      newMenuItem = new MenuItem('Title', state.persistentMenu.getMenuItem(action.parentId), {});
      newPersistentMenu.addMenuItem(newMenuItem, action.parentId);
      return {
        ...state,
        persistentMenu: newPersistentMenu,
        isEditingMenuItem: newMenuItem.id,
      };
    case 'DELETE_MENU_ITEM':
      newPersistentMenu = cloneDeep(state.persistentMenu);
      newPersistentMenu.deleteMenuItem(action.menuItemId);
      return {
        ...state,
        persistentMenu: newPersistentMenu,
        isEditingMenuItem: state.isEditingMenuItem === action.menuItemId ? null : state.isEditingMenuItem,
        subMenuOpen: state.subMenuOpen === action.menuItemId ? null : state.subMenuOpen,
        subSubMenuOpen: state.subSubMenuOpen === action.menuItemId ? null : state.subSubMenuOpen,
      };
    case 'CLICK_MENU_ITEM':
      return {...state, isEditingMenuItem: action.menuItemId};
    case 'EDIT_TITLE':
      newPersistentMenu = cloneDeep(state.persistentMenu);
      newPersistentMenu.getMenuItem(action.menuItemId).setTitle(action.title);
      return {...state, persistentMenu: newPersistentMenu};
    case 'EDIT_MENU_ITEM_TYPE':
      newPersistentMenu = cloneDeep(state.persistentMenu);
      newPersistentMenu.editMenuItem(action.menuItemType, action.menuItemId);
      return {...state, persistentMenu: newPersistentMenu};
    case 'EDIT_PAYLOAD':
      newPersistentMenu = cloneDeep(state.persistentMenu);
      newPersistentMenu.getMenuItem(action.menuItemId).setPayload(action.payload);
      return {...state, persistentMenu: newPersistentMenu};
    case 'EDIT_WEB_URL':
      newPersistentMenu = cloneDeep(state.persistentMenu);
      newPersistentMenu.getMenuItem(action.menuItemId).setUrl(action.url);
      return {...state, persistentMenu: newPersistentMenu};
    case 'START_EDIT_SUB_MENU':
      return {...state, isEditingSubMenu: action.menuItem.id};
    case 'OPEN_SUB_MENU':
      return {...state, subMenuOpen: action.menuItemId};
    case 'OPEN_SUB_SUB_MENU':
      return {...state, subSubMenuOpen: action.menuItemId, menuViewLevel: 1};
    case 'SLIDE_MENU_VIEW':
      return {...state, menuViewLevel: action.menuViewLevel};
    default:
      return state;
  }
};

export default persistentMenuReducer;

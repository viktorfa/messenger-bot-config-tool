import {cloneDeep, isBoolean} from 'lodash';
import PostbackButton from "../models/PostbackButton";
import SubMenu from "../models/SubMenu";
import WebUrlButton from "../models/WebUrlButton";
import PersistentMenu from "../models/PersistentMenu";

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
  const initialSubMenu = new SubMenu('My Account', 1, 'root');
  const initialMenuItems = [
    initialSubMenu,
    new WebUrlButton('Latest News', 'https://inneklemtedager.no', 'root'),
  ];
  initialMenuItems.forEach(menuItem => {
    initialPersistentMenu.addMenuItem(menuItem, 'root')
  });

  const initialSubMenuItems = [
    new PostbackButton('Pay Bill', 'PAYBILL_PAYLOAD', initialSubMenu.id),
    new PostbackButton('History', 'HISTORY_PAYLOAD', initialSubMenu.id),
    new PostbackButton('Contact Info', 'CONTACT_INFO_PAYLOAD', initialSubMenu.id),
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
  console.log("GOT NEW ACTION");
  console.log(action);
  let newPersistentMenu;
  let newCallToActions;
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
      newMenuItem = new PostbackButton('Title', '', action.parentId);
      newPersistentMenu.addMenuItem(newMenuItem, action.parentId);
      return {
        ...state,
        persistentMenu: newPersistentMenu,
        isEditingMenuItem: newMenuItem.id,
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
      return {...state, subSubMenuOpen: action.menuItemId};
    default:
      return state;
  }
};

export default persistentMenuReducer;

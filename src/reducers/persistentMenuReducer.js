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

const getInitialState = () => {
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

  return {persistentMenu: initialPersistentMenu, foo: 'bar'};
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
    case 'ADD_URL_BUTTON':
      if (action.submenu === 'root' && state.persistentMenu.call_to_actions.length < 5) {
        const newButton = {
          type: 'web_url',
          title: action.title,
          url: action.url,
          webview_height_ratio: action.webview_height_ratio
        };
        newCallToActions = state.persistentMenu.call_to_actions.concat(newButton);
        newPersistentMenu = cloneDeep(state.persistentMenu);
        newPersistentMenu.call_to_actions = newCallToActions;
        return {...state, persistentMenu: newPersistentMenu}
      }
      return state;
    case 'ADD_SUB_MENU':
      return state;
    case 'CLICK_ADD_NEW_ITEM':
      newPersistentMenu = cloneDeep(state.persistentMenu);
      newMenuItem = new PostbackButton('Title', '', action.parentId);
      newPersistentMenu.addMenuItem(newMenuItem, action.parentId);
      return {...state, persistentMenu: newPersistentMenu, isEditingMenuItem: newMenuItem.id};
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
    default:
      return state;
  }
};

export default persistentMenuReducer;

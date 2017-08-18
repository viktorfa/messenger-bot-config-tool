import {cloneDeep, isBoolean} from 'lodash';

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

const persistentMenuReducer = (state = initialState, action) => {
  console.log("GOT NEW ACTION");
  console.log(action);
  let newPersistentMenu;
  let newCallToActions;
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
    default:
      return state;
  }
};

export default persistentMenuReducer;

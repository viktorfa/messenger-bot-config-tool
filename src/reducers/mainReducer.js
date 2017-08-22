const inititalState = {foo: 'bar', currentTab: 'getStarted'};

const mainReducer = (state = inititalState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {...state, accessToken: action.accessToken};
    case 'START_SEND_PERSISTENT_MENU_REQUEST':
      return {...state, loading: true};
    case 'PERSISTENT_MENU_REQUEST_FINISH':
      return {...state, loading: false, message: action.message};
    case 'START_SEND_FACEBOOK_HTTP_REQUEST':
      return {...state, loading: true};
    case 'SEND_FACEBOOK_HTTP_REQUEST_FINISH':
      return {...state, loading: false, message: action.message};
    case 'SWITCH_TAB':
      return {...state, currentTab: action.tabName};
    default:
      return state;
  }
};

export default mainReducer;

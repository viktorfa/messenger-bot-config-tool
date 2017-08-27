const inititalState = {foo: 'bar', currentTab: 'getStarted'};

const mainReducer = (state = inititalState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {...state, accessToken: action.accessToken, accessTokenIsValid: undefined};
    case 'START_SEND_FACEBOOK_HTTP_REQUEST':
      return {...state, loading: true};
    case 'SEND_FACEBOOK_HTTP_REQUEST_FINISH':
      return {...state, loading: false, message: action.message};
    case 'SET_CURRENT_BOT_CONFIG_STATE':
      return {
        ...state,
        currentGreeting: action.greeting,
        currentPersistentMenu: action.persistentMenu,
        currentGetStarted: action.getStarted,
        accessTokenIsValid: true,
      };
    case 'SET_ACCESS_TOKEN_INVALID':
      return {...state, accessTokenIsValid: false};
    default:
      return state;
  }
};

export default mainReducer;

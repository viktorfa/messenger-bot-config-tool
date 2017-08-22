const inititalState = {foo: 'bar'};

const mainReducer = (state = inititalState, action) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {...state, accessToken: action.accessToken};
    case 'START_SEND_PERSISTENT_MENU_REQUEST':
      return {...state, loading: true};
    case 'PERSISTENT_MENU_REQUEST_FINISH':
      return {...state, loading: false, message: action.message};
    default:
      return state;
  }
};

export default mainReducer;

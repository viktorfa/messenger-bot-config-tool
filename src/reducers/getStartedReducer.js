import {cloneDeep} from 'lodash';
import GetStartedButton from "../models/GetStartedButton";

export const getInitialGetStartedButton = () => {
  const result = new GetStartedButton();
  result.setPayload("SOMETHING_PAYLOAD");
  return result;
};

const getStartedReducer = (state = {getStartedButton: getInitialGetStartedButton(), foo: 'bar'}, action) => {
  let newGetStartedButton;
  switch (action.type) {
    case 'EDIT_GET_STARTED_PAYLOAD':
      newGetStartedButton = cloneDeep(state.getStartedButton);
      newGetStartedButton.setPayload(action.payload);
      return {...state, getStartedButton: newGetStartedButton};
    default:
      return state;
  }
};

export default getStartedReducer;

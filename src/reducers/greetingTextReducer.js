import {cloneDeep} from 'lodash';
import GreetingText from "../models/GreetingText";

export const getInitialGreetingText = () => {
  const result = new GreetingText();
  result.setText("Welcome");
  return result;
};

const greetingTextReducer = (state = {greetingText: getInitialGreetingText(), foo: 'bar'}, action) => {
  let newGreetingText;
  switch (action.type) {
    case 'EDIT_GREETING_TEXT_TEXT':
      newGreetingText = cloneDeep(state.greetingText);
      newGreetingText.setText(action.text);
      return {...state, greetingText: newGreetingText};
    case 'SET_GREETING_TEXT':
      return {...state, greetingText: action.greetingText};
    default:
      return state;
  }
};

export default greetingTextReducer;

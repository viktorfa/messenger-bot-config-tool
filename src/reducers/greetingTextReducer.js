import {cloneDeep} from 'lodash';
import GreetingText from "../models/GreetingText";

export const getInitialGreetingText = () => {
  const result = new GreetingText();
  result.setText("What's up niggaz");
  return result;
};

const greetingTextReducer = (state = {greetingText: getInitialGreetingText(), foo: 'bar'}, action) => {
  let newGreetingText;
  switch (action.type) {
    case 'EDIT_GREETING_TEXT_TEXT':
      newGreetingText = cloneDeep(state.greetingText);
      newGreetingText.setText(action.text);
      return {...state, greetingText: newGreetingText};
    default:
      return state;
  }
};

export default greetingTextReducer;

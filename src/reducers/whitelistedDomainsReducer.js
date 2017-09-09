import {cloneDeep} from 'lodash';
import WhitelistedDomains from "../models/WhitelistedDomains";

const whitelistedDomainsReducer = (state = {whitelistedDomains: new WhitelistedDomains(), foo: 'bar'}, action) => {
  let newWhitelistedDomains;
  switch (action.type) {
    case 'ADD_DOMAIN':
      newWhitelistedDomains = cloneDeep(state.whitelistedDomains);
      try {
        newWhitelistedDomains.addDomain(action.domain);
      } catch (error) {
        return {...state, message: error.message, messageType: 'error'};
      }
      return {...state, whitelistedDomains: newWhitelistedDomains};
    case 'REMOVE_DOMAIN':
      newWhitelistedDomains = cloneDeep(state.whitelistedDomains);
      newWhitelistedDomains.removeDomain(action.domain);
      return {...state, whitelistedDomains: newWhitelistedDomains};
    case 'SET_WHITELISTED_DOMAINS':
      return {...state, whitelistedDomains: action.whitelistedDomains};
    default:
      return state;
  }
};

export default whitelistedDomainsReducer;

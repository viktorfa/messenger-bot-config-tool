import React from 'react';
import {connect} from 'react-redux';
import WhitelistedDomainsComponent from './WhitelistedDomainsComponent';

const addDomain = (domain) => {
  return {type: 'ADD_DOMAIN', domain};
};

const removeDomain = (domain) => {
  return {type: 'REMOVE_DOMAIN', domain};
};

const mapStateToProps = (state) => {
  return {
    whitelistedDomains: state.whitelistedDomainsReducer.whitelistedDomains,
    message: state.whitelistedDomainsReducer.message,
    messageType: state.whitelistedDomainsReducer.messageType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDomain: (domain) => dispatch(addDomain(domain)),
    removeDomain: (domain) => dispatch(removeDomain(domain))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhitelistedDomainsComponent);

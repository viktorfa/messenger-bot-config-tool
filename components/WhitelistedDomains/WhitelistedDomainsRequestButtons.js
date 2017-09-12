import React from "react";
import PropTypes from 'prop-types';
import MBCRequestButtonsMenu from '../Util/MBCRequestButtonsMenu'

const WhitelistedDomainsRequestButtons = (props) => {
  return (
      <MBCRequestButtonsMenu
        fieldName={'Whitelisted domains'}
        tokenIsValidated={!props.disabled}
        updateHandler={props.sendWhitelistedDomainsRequest}
        loadHandler={props.loadCurrentWhitelistedDomains}
        deleteHandler={props.deleteExistingWhitelistedDomains}
      />
  )
};

WhitelistedDomainsRequestButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loadCurrentWhitelistedDomains: PropTypes.func.isRequired,
  sendWhitelistedDomainsRequest: PropTypes.func.isRequired,
  deleteExistingWhitelistedDomains: PropTypes.func.isRequired,
};

export default WhitelistedDomainsRequestButtons;

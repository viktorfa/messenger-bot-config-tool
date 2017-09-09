import React from "react";
import PropTypes from 'prop-types';

const WhitelistedDomainsRequestButtons = (props) => {
  return (
    <div style={{display: 'flex'}}>
      <button className="mdl-button mdl-js-button" onClick={event => props.sendWhitelistedDomainsRequest(event)}
              disabled={props.disabled}>
        Update existing whitelisted domains
        <span id="set-whitelisted-domains-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <button className="mdl-button mdl-js-button"
              onClick={event => props.loadCurrentWhitelistedDomains(event)}
              disabled={props.disabled}>
        Load existing whitelisted domains
        <span id="load-whitelisted-domains-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <button className="mdl-button mdl-js-button"
              onClick={event => props.deleteExistingWhitelistedDomains(event)}
              disabled={props.disabled}>
        Delete existing whitelisted domains
        <span id="delete-whitelisted-domains-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <div className={`mdl-tooltip`}
           data-mdl-for="load-whitelisted-domains-tooltip">
        Validate your token first
      </div>
      <div className={`mdl-tooltip`}
           data-mdl-for="set-whitelisted-domains-tooltip">
        Validate your token first
      </div>
      <div className={`mdl-tooltip`}
           data-mdl-for="delete-whitelisted-domains-tooltip">
        Validate your token first
      </div>
    </div>
  )
};

WhitelistedDomainsRequestButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loadCurrentWhitelistedDomains: PropTypes.func.isRequired,
  sendWhitelistedDomainsRequest: PropTypes.func.isRequired,
  deleteExistingWhitelistedDomains: PropTypes.func.isRequired,
};

export default WhitelistedDomainsRequestButtons;

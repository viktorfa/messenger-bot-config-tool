import React from "react";
import PropTypes from 'prop-types';

const PersistentMenuRequestButtons = (props) => {
  return (
    <div style={{display: 'flex'}}>
      <button className="mdl-button mdl-js-button" onClick={event => props.sendPersistentMenuRequest(event)}
              disabled={props.disabled}>
        Send persistent menu request
        <span id="set-persistent-menu-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <button className="mdl-button mdl-js-button"
              onClick={event => props.loadCurrentPersistentMenu(event)}
              disabled={props.disabled}>
        Load existing persistent menu
        <span id="load-persistent-menu-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <div className={`mdl-tooltip`}
           data-mdl-for="load-persistent-menu-tooltip">
        Validate your token first
      </div>
      <div className={`mdl-tooltip`}
           data-mdl-for="set-persistent-menu-tooltip">
        Validate your token first
      </div>
    </div>
  )
};

PersistentMenuRequestButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loadCurrentPersistentMenu: PropTypes.func.isRequired,
  sendPersistentMenuRequest: PropTypes.func.isRequired,
};

export default PersistentMenuRequestButtons;

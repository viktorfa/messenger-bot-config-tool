import React from "react";
import PropTypes from 'prop-types';

const GreetingTextRequestButtons = (props) => {
  return (
    <div style={{display: 'flex'}}>
      <button className="mdl-button mdl-js-button" onClick={event => props.sendGreetingTextRequest(event)}
              disabled={props.disabled}>
        Send greeting text request
        <span id="set-greeting-text-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <button className="mdl-button mdl-js-button"
              onClick={event => props.loadCurrentGreetingText(event)}
              disabled={props.disabled}>
        Load existing greeting text
        <span id="load-greeting-text-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <button className="mdl-button mdl-js-button"
              onClick={event => props.deleteExistingGreetingText(event)}
              disabled={props.disabled}>
        Delete existing greeting text
        <span id="delete-greeting-text-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <div className={`mdl-tooltip`}
           data-mdl-for="load-greeting-text-tooltip">
        Validate your token first
      </div>
      <div className={`mdl-tooltip`}
           data-mdl-for="set-greeting-text-tooltip">
        Validate your token first
      </div>
      <div className={`mdl-tooltip`}
           data-mdl-for="delete-greeting-text-tooltip">
        Validate your token first
      </div>
    </div>
  )
};

GreetingTextRequestButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loadCurrentGreetingText: PropTypes.func.isRequired,
  sendGreetingTextRequest: PropTypes.func.isRequired,
  deleteExistingGreetingText: PropTypes.func.isRequired,
};

export default GreetingTextRequestButtons;

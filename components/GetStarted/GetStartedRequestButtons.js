import React from "react";
import PropTypes from 'prop-types';

const GetStartedRequestButtons = (props) => {
  return (
    <div style={{display: 'flex'}}>
      <button className="mdl-button mdl-js-button" onClick={event => props.sendGetStartedRequest(event)}
              disabled={props.disabled}>
        Send get started request
        <span id="set-get-started-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <button className="mdl-button mdl-js-button"
              onClick={event => props.loadCurrentGetStartedButton(event)}
              disabled={props.disabled}>
        Load existing get started
        <span id="load-get-started-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <button className="mdl-button mdl-js-button"
              onClick={event => props.deleteExistingGetStartedButton(event)}
              disabled={props.disabled}>
        Delete existing get started
        <span id="delete-get-started-tooltip"
              className={`material-icons ${props.disabled ? '' : 'hidden'}`}>
                  help
                </span>
      </button>
      <div className={`mdl-tooltip`}
           data-mdl-for="load-get-started-tooltip">
        Validate your token first
      </div>
      <div className={`mdl-tooltip`}
           data-mdl-for="set-get-started-tooltip">
        Validate your token first
      </div>
      <div className={`mdl-tooltip`}
           data-mdl-for="delete-get-started-tooltip">
        Validate your token first
      </div>
    </div>
  )
};

GetStartedRequestButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loadCurrentGetStartedButton: PropTypes.func.isRequired,
  sendGetStartedRequest: PropTypes.func.isRequired,
  deleteExistingGetStartedButton: PropTypes.func.isRequired,

};

export default GetStartedRequestButtons;

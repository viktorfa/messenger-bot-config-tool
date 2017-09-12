import React from 'react';
import PropTypes from 'prop-types';
const MBCToggleableTooltipButton = (props) => {
  const id = props.buttonText.toLowerCase();
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
      {
        showTooltip(props) &&
        <i id={id}
           className={`material-icons`}>
          help
        </i>
      }
      <button
        className="mdl-button mdl-js-button"
        onClick={props.onClickHandler}
        disabled={props.disabled}
      >
        <span>
        {props.buttonText}
        </span>
      </button>
      <div className={`mdl-tooltip`}
           data-mdl-for={id}>
        {props.disabled ? props.disabledTooltipText : props.enabledTooltipText}
      </div>
    </div>
  )
};

const showTooltip = (props) => {
  return props.disabled && props.disabledTooltipText || !props.disabled && props.enabledTooltipText
};

MBCToggleableTooltipButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  disabledTooltipText: PropTypes.string,
  enabledTooltipText: PropTypes.string
};

export default MBCToggleableTooltipButton;

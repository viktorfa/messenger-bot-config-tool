import React from "react";
import PropTypes from 'prop-types';

const InputLengthChip = (props) => {
  return (
    <span
      className="mdl-chip"
      style={ props.style || {position: 'absolute', right: 0, top: 0, zIndex: '-1'}}
    >
            <span
              className="mdl-chip__text"
            >
              {props.maxLength - props.inputText.length}
              </span>
          </span>
  )
};

InputLengthChip.propTypes = {
  maxLength: PropTypes.number.isRequired,
  inputText: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default InputLengthChip;

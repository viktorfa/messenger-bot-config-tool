import React from 'react';
import PropTypes from 'prop-types';

class MBCCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.id = `${this.props.labelText.toLowerCase()}-checkbox`;
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClick();
  }

  render() {
    return (
      <div>
        <label
          className={`mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect ${this.props.checked ? 'is-checked' : ''}`}
          htmlFor={this.id}>
          <input type="checkbox" id={this.id} className="mdl-checkbox__input"
                 style={{visibility: 'hidden'}}
                 checked={this.props.checked}
                 onClick={this.handleClick}/>
          <span className="mdl-checkbox__label">{this.props.labelText}</span>
        </label>
      </div>
    )
  }
}

MBCCheckbox.propTypes = {
  handleClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  labelText: PropTypes.string,
};

export default MBCCheckbox;

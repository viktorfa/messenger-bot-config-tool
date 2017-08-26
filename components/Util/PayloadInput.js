import React from "react";
import PropTypes from 'prop-types';
import InputLengthChip from './InputLengthChip';

class PayloadInput extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  };

  componentDidUpdate() {
    componentHandler.upgradeDom();
  };

  render() {
    return (
      <div>
        <div className={`mdl-textfield mdl-js-textfield ${this.props.payload.validate() ? '' : 'is-invalid'}`}
             style={this.props.style || {}}>
          <label className="mdl-textfield__label" htmlFor="payload-input">{this.props.label || 'Payload'}</label>
          <textarea className="mdl-textfield__input"
                    type="text"
                    id="payload-input"
                    onChange={event => this.props.editPayload(event)}
                    value={this.props.payload.getText()}
          />
          <InputLengthChip maxLength={this.props.payload.maxLength} inputText={this.props.payload.getText()}/>
        </div>
        <div style={{marginTop: '-20px'}}>
          {
            this.props.payload.isParseable() &&
            <span className="mdl-chip mdl-color--green-300"><span
              className="mdl-chip__text">Payload is JSON parseable</span></span>
            ||
            <span className="mdl-chip mdl-color--orange-300"><span className="mdl-chip__text">Payload is not JSON parseable</span></span>
          }
        </div>
      </div>
    )
  }
}

PayloadInput.propTypes = {
  payload: PropTypes.object.isRequired,
  editPayload: PropTypes.func.isRequired,
  label: PropTypes.string,
  style: PropTypes.object,
};

export default PayloadInput;

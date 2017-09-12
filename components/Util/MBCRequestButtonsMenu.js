import React from 'react';
import PropTypes from 'prop-types';
import MBCToggleableTooltipButton from './MBCToggleableTooltipButton';

class MBCRequestButtonsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.menuId = `request-buttons-${this.props.fieldName}`.toLowerCase();
  }

  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <MBCToggleableTooltipButton
          buttonText={`Update existing ${this.props.fieldName}`}
          onClickHandler={this.props.updateHandler}
          disabled={!this.props.tokenIsValidated}
          disabledTooltipText={`Validate token first`}
          enabledTooltipText={`Syncs your bot with this`}
        />
        <MBCToggleableTooltipButton
          buttonText={`Load existing ${this.props.fieldName}`}
          onClickHandler={this.props.loadHandler}
          disabled={!this.props.tokenIsValidated}
          disabledTooltipText={`Validate token first`}
          enabledTooltipText={`Loads your bot's config to this site`}
        />
        <button id={this.menuId} className="mdl-button mdl-js-button mdl-button--icon">
          <i className="material-icons">more_horiz</i>
        </button>
        <div className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" htmlFor={this.menuId}>
          <div className="mdl-menu__item">
            <MBCToggleableTooltipButton
              buttonText={`Delete existing ${this.props.fieldName}`}
              onClickHandler={this.props.deleteHandler}
              disabled={!this.props.tokenIsValidated}
              disabledTooltipText={`Validate token first`}
              enabledTooltipText={`Deletes ${this.props.fieldName} on your bot`}
            />
          </div>
        </div>
      </div>
    )
  }
}

MBCRequestButtonsMenu.propTypes = {
  updateHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  loadHandler: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  tokenIsValidated: PropTypes.bool.isRequired,
};

export default MBCRequestButtonsMenu;

import React from "react";
import PropTypes from 'prop-types';

class MessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: true};
  }

  componentDidMount() {
    this.makeVisible();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageId !== this.props.messageId) {
      this.makeVisible();
    }
  }

  makeVisible() {
    setTimeout(this.makeInvisible.bind(this), this.props.timeout);
    this.setState({isVisible: true})
  }

  makeInvisible() {
    this.setState({isVisible: false})
  }

  getColorClassName() {
    switch (this.props.messageStatus) {
      case 'success':
        return 'mdl-color--green-300';
      case 'error':
        return 'mdl-color--red-300';
      default:
        return 'mdl-color--grey-300';
    }
  }

  render() {
    if (this.state.isVisible) {
      return (
        <div className={this.getColorClassName()} style={{
          position: 'fixed',
          zIndex: '10',
          textAlign: 'center',
          width: '100vw',
          left: 0
        }}>
          <h4>{this.props.messageText}</h4>
        </div>
      )
    } else {
      return null;
    }
  }
}

MessageComponent.propTypes = {
  timeout: PropTypes.number.isRequired,
  messageText: PropTypes.string.isRequired,
  messageId: PropTypes.number.isRequired,
  messageStatus: PropTypes.string,
};

export default MessageComponent;

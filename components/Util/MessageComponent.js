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

  render() {
    if (this.state.isVisible) {
      return (
        <div style={{position: 'fixed', background: 'lightgray', zIndex: '10', textAlign: 'center', width: '100vw', left: 0}}>
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
};

export default MessageComponent;

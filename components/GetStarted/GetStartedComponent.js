import React from "react";
import PayloadInput from '../Util/PayloadInput';

class GetStartedComponent extends React.Component {

  editPayload(event) {
    event.preventDefault();
    this.props.editPayload(event.target.value);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  };

  componentDidUpdate() {
    componentHandler.upgradeDom();
  };

  render() {
    return (
      <PayloadInput payload={this.props.getStartedButton.payload} editPayload={this.editPayload.bind(this)}/>
    )
  }
}

export default GetStartedComponent;

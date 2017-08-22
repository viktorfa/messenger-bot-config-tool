import React from "react";

class GetStartedComponent extends React.Component {

  editPayload(event) {
    event.preventDefault();
    this.props.editPayload(event.target.value);
  }

  render() {
    return (
      <div>
        This is the GetStartedComponent
        <code>{JSON.stringify(this.props)}</code>
        <div>
          <label htmlFor="get-started-payload">Get started button payload</label>
          <input type="text" id="get-started-payload" onChange={event => this.editPayload(event)}/>
        </div>
      </div>
    )
  }
}

export default GetStartedComponent;

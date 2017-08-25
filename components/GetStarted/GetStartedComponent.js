import React from "react";

class GetStartedComponent extends React.Component {

  editPayload(event) {
    event.preventDefault();
    this.props.editPayload(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="mdl-textfield mdl-js-textfield">
          <label className="mdl-textfield__label" htmlFor="get-started-payload">Get started button payload</label>
          <textarea className="mdl-textfield__input" type="text" id="get-started-payload"
                    onChange={event => this.editPayload(event)}/>
        </div>
      </div>
    )
  }
}

export default GetStartedComponent;

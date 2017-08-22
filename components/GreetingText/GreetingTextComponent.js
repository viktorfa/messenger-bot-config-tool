import React from "react";

class GreetingTextComponent extends React.Component {

  editText(event) {
    event.preventDefault();
    this.props.editText(event.target.value);
  }

  render() {
    return (
      <div>
        This is the GreetingTextComponent
        <code>{JSON.stringify(this.props)}</code>
        <div>
          <label htmlFor="greeting-text-text">Greeting text</label>
          <input type="text" id="greeting-text-text" onChange={event => this.editText(event)}/>
        </div>
      </div>
    )
  }
}

export default GreetingTextComponent;

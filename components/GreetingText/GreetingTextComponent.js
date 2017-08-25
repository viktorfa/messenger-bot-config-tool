import React from "react";

class GreetingTextComponent extends React.Component {

  editText(event) {
    event.preventDefault();
    this.props.editText(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="mdl-textfield mdl-js-textfield">
          <span className="mdl-chip" style={{position: 'absolute', right: 0, top: 0, zIndex: '-1'}}>
            <span className="mdl-chip__text">{160 - this.props.greetingText.text.length}</span>
          </span>
          <label className="mdl-textfield__label" htmlFor="greeting-text-text">Greeting text</label>
          <textarea className="mdl-textfield__input"
                    type="text"
                    id="greeting-text-text"
                    maxLength="160"
                    onChange={event => this.editText(event)}
                    rows="4"
                    value={this.props.greetingText.text}
          />
        </div>
      </div>
    )
  }
}

export default GreetingTextComponent;

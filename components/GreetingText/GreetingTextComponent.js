import React from "react";
import InputLengthChip from '../Util/InputLengthChip';

class GreetingTextComponent extends React.Component {

  editText(event) {
    event.preventDefault();
    this.props.editText(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="mdl-textfield mdl-js-textfield">
          <InputLengthChip maxLength={160} inputText={this.props.greetingText.text}/>
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

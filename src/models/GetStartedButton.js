import Payload from './Payload';

class GetStartedButton {
  constructor(payloadText) {
    this.payload = new Payload(payloadText || '', 1000);
  }

  setPayload(payload) {
    this.payload.setText(payload);
  }

  getPayloadText() {
    return this.payload.getText();
  }

  validate() {
    return this.payload.validate();
  }

  createBodyForRequest() {
    return {
      get_started: {
        payload: this.payload.getText()
      }
    }
  }
}

export default GetStartedButton;

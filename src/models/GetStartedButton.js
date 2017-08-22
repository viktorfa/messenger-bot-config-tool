class GetStartedButton {
  constructor() {
    this.payload = '';
  }

  setPayload(payload) {
    this.payload = payload;
  }

  createBodyForRequest() {
    return {
      get_started: {
        payload: this.payload
      }
    }
  }
}

export default GetStartedButton;

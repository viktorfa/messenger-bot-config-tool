import CallToAction from './CallToAction';

class PostbackButton extends CallToAction {
  constructor(title, payload, parent, id) {
    super('postback', title, parent, id);
    this.payload = payload;
  }

  setPayload(payload) {
    this.payload = payload;
  }
}

export default PostbackButton;

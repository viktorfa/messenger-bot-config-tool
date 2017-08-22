class GreetingText {
  constructor() {
    this.locale = 'default';
    this.text = '';
  }

  setText(text) {
    this.text = text;
  }

  createBodyForRequest() {
    return {
      greeting: [{text: this.text, locale: this.locale}]
    }
  }
}

export default GreetingText;

class GreetingText {
  constructor(locale, text) {
    this.locale = locale || 'default';
    this.text = text || '';
  }

  setText(text) {
    this.text = text;
  }

  createBodyForRequest() {
    return {
      greeting: [{text: this.text, locale: this.locale}]
    }
  }

  static constructFromPrevious(previous) {
    if (previous) {
      return new GreetingText(previous.locale, previous.text);
    } else {
      return new GreetingText();
    }
  }
}

export default GreetingText;

class Payload {
  constructor(text, maxLength) {
    this.text = text;
    this.stringifiedText = JSON.stringify(text);
    this.maxLength = maxLength || 1000;
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
    this.stringifiedText = JSON.stringify(text);
  }

  validate() {
    return !!this.text && !!this.stringifiedText && this.text.length <= this.maxLength;
  }

  isParseable() {
    try {
      return !!JSON.parse(this.text);
    } catch (error) {
      return false;
    }
  }
}

export default Payload;

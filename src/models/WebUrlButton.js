import CallToAction from './CallToAction';

class WebUrlButton extends CallToAction {
  constructor(title, url, parent, id) {
    super('web_url', title, parent, id);
    this.url = url;
  }

  setUrl(url) {
    this.url = url;
  }
}

export default WebUrlButton;

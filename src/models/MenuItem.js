import _ from 'lodash';
import CallToAction from "./CallToAction";

class MenuItem extends CallToAction {
  constructor(title, parent, config) {
    super(config.type || 'postback', title, parent.id, config.id || null);

    this.level = parent.level + 1;
    this.children = {};
    this.call_to_actions = [];
    this.url = config.url || 'http://example.com';
    this.webview_height_ratio = config.webview_height_ratio || 'full';
    this.payload = config.payload || 'PAYLOAD'
  }

  addChild(menuItem) {
    this.children[menuItem.id] = menuItem;
  }

  canAddMenuItem() {
    return Object.keys(this.children).length < 3;
  }

  getMenuItem(id) {
    return this.children[id];
  }

  getCallToActionsForRequest() {
    return _.map(this.children, (menuItem, key) => {
      switch (menuItem.type) {
        case 'web_url':
          return {
            type: menuItem.type,
            title: menuItem.title,
            url: menuItem.url,
            webview_height_ratio: menuItem.webview_height_ratio
          };
        case 'postback':
          return {
            type: menuItem.type,
            title: menuItem.title,
            payload: menuItem.payload
          };
        case 'nested':
          return {
            type: menuItem.type,
            title: menuItem.title,
            call_to_actions: menuItem.getCallToActionsForRequest()
          };
        default:
          throw `Invalid type: ${menuItem.type}`;
      }
    });
  }

  setPayload(payload) {
    this.payload = payload;
  }

  setUrl(url) {
    this.url = url;
  }

  setWebViewHeightRatio(webViewHeightRatio) {
    this.webview_height_ratio = webViewHeightRatio;
  }

}

export default MenuItem;

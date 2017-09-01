import _ from 'lodash';
import CallToAction from "./CallToAction";
import Payload from "./Payload";

class MenuItem extends CallToAction {
  constructor(title, parent, config) {
    super(config.type || 'postback', title, parent.id, config.id || null);

    this.level = parent.level + 1;
    this.children = {};
    this.call_to_actions = [];
    this.url = config.url || 'http://example.com';
    this.webview_height_ratio = config.webview_height_ratio || 'full';
    this.payload = new Payload(config.payload || '', 1000)
  }

  static constructFromPreviousAndAddToMenu(previous, parent, persistentMenu) {
    switch (previous.type) {
      case 'web_url':
        persistentMenu.addMenuItem(new MenuItem(previous.title, parent, {
          type: 'web_url',
          webview_height_ratio: previous.webview_height_ratio,
          url: previous.url
        }), parent.id);
        break;
      case 'postback':
        persistentMenu.addMenuItem(new MenuItem(previous.title, parent, {payload: previous.payload, type: 'postback'}), parent.id);
        break;
      case 'nested':
        const subMenu = persistentMenu.addMenuItem(new MenuItem(previous.title, parent, {type: 'nested'}), parent.id);
        previous.call_to_actions.forEach(callToAction => {
          MenuItem.constructFromPreviousAndAddToMenu(callToAction, subMenu, persistentMenu);
        });
        break;
      default:
        throw "Received unknown call to action."
    }
  }

  addChild(menuItem) {
    this.children[menuItem.id] = menuItem;
  }

  canAddMenuItem() {
    if (this.level === 0) {
      return Object.keys(this.children).length < 3;
    } else {
      return Object.keys(this.children).length < 5
    }
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
            payload: menuItem.payload.getText()
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
    this.payload.setText(payload);
  }

  setUrl(url) {
    this.url = url;
  }

  setWebViewHeightRatio(webViewHeightRatio) {
    this.webview_height_ratio = webViewHeightRatio;
  }

}

export default MenuItem;

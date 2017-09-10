import _ from 'lodash';
import CallToAction from "./CallToAction";
import Payload from "./Payload";

class MenuItem extends CallToAction {
  constructor(title, parent, config) {
    super(config.type || 'postback', title, parent.id, config.id || null);

    this.level = parent.level + 1;
    this.children = {};
    this.call_to_actions = [];
    this.payload = new Payload(config.payload || '', 1000);
    this.url = config.url || 'http://example.com';
    this.webview_height_ratio = config.webview_height_ratio || 'full';
    if (config.messenger_extensions === true) {
      this.messenger_extensions = config.messenger_extensions;
      this.fallback_url = config.fallback_url || this.url;
      this.webview_share_button = config.webview_share_button || '';
    }
  }

  /**
   * Constructs a valid menu item and adds it correctly to the persistent menu in the argument list. Used when
   * constructing a PersistentMenu instance from JSON.
   * @param previous
   * @param parent
   * @param persistentMenu
   */
  static constructFromPreviousAndAddToMenu(previous, parent, persistentMenu) {
    switch (previous.type) {
      case 'web_url':
        persistentMenu.addMenuItem(new MenuItem(previous.title, parent, {
          type: 'web_url',
          url: previous.url,
          webview_height_ratio: previous.webview_height_ratio,
          messenger_extensions: previous.messenger_extensions,
          fallback_url: previous.fallback_url,
          webview_share_button: previous.webview_share_button
        }), parent.id);
        break;
      case 'postback':
        persistentMenu.addMenuItem(new MenuItem(previous.title, parent, {
          payload: previous.payload,
          type: 'postback'
        }), parent.id);
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
            webview_height_ratio: menuItem.webview_height_ratio,
            messenger_extensions: menuItem.messenger_extensions,
            //fallback_url: menuItem.fallback_url,
            //webview_share_button: menuItem.webview_share_button
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

  setFallbackUrl(url) {
    this.fallback_url = url;
  }

  setOptionFields(options) {
    _.merge(this, _.pick(options, ['webview_height_ratio', 'messenger_extensions', 'webview_share_button']));
  }

}

export default MenuItem;

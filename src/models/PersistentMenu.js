import _ from 'lodash';
import SubMenu from './SubMenu';
import WebUrlButton from "./WebUrlButton";
import PostbackButton from "./PostbackButton";

class PersistentMenu {
  constructor() {
    this.locale = 'default';
    this.composer_input_disabled = true;
    this.call_to_actions = [];
    this.subMenus = {};
    this.menuItems = {root: new SubMenu('root', 0, 'root', 'root')};
    this.idCount = 0;
  }

  static constructFromPrevious(previous) {

  }

  createBodyForRequest() {
    const result = {
      locale: this.locale,
      composer_input_disabled: this.composer_input_disabled,
      call_to_actions: this.menuItems['root'].getCallToActionsForRequest()
    };

    return result;
  }

  addSubMenu(subMenu, subMenuId) {
    const id = this.getId();
    subMenu.id = id;
    this.menuItems[id] = subMenu;
    this.menuItems[subMenuId].addChild(subMenu);
  }

  addWebUrlButton(webUrlButton, subMenuId) {
    const id = this.getId();
    webUrlButton.id = id;
    this.menuItems[id] = webUrlButton;
    this.menuItems[subMenuId].addChild(webUrlButton);
  }

  addPostbackButton(postbackButton, subMenuId) {
    const id = this.getId();
    postbackButton.id = id;
    this.menuItems[id] = postbackButton;
    this.menuItems[subMenuId].addChild(postbackButton);
  }

  addMenuItem(menuItem, subMenuId) {
    const id = this.getId();
    menuItem.id = id;
    this.menuItems[id] = menuItem;
    this.menuItems[subMenuId].addChild(menuItem);
  }

  getMenuItem(id) {
    return this.menuItems[id];
  }

  editMenuItem(type, menuItemId) {
    let newMenuItem;
    switch (type) {
      case 'web_url':
        newMenuItem = new WebUrlButton(this.menuItems[menuItemId].title, '', this.menuItems[menuItemId].parent, this.menuItems[menuItemId].id);
        this.menuItems[menuItemId] = newMenuItem;
        this.menuItems[newMenuItem.parent].children[newMenuItem.id] = newMenuItem;
        break;
      case 'postback':
        newMenuItem = new PostbackButton(this.menuItems[menuItemId].title, '', this.menuItems[menuItemId].parent, this.menuItems[menuItemId].id);
        this.menuItems[menuItemId] = newMenuItem;
        this.menuItems[newMenuItem.parent].children[newMenuItem.id] = newMenuItem;
        break;
      case 'nested':
        const level = this.menuItems[this.menuItems[menuItemId].parent].level + 1;
        newMenuItem = new SubMenu(this.menuItems[menuItemId].title, level, this.menuItems[menuItemId].parent, this.menuItems[menuItemId].id);
        this.menuItems[menuItemId] = newMenuItem;
        this.menuItems[newMenuItem.parent].children[newMenuItem.id] = newMenuItem;
        break;
      default:
        return this;
    }
  }

  getId() {
    return '' + ++this.idCount;
  }

}

export default PersistentMenu;

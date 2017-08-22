import _ from 'lodash';
import CallToAction from "./CallToAction";

class SubMenu extends CallToAction {
  constructor(title, level, parent, id) {
    super('nested', title, parent, id);
    this.level = level;
    this.children = {};
    this.call_to_actions = [];
  }

  addChild(menuItem) {
    this.children[menuItem.id] = menuItem;
  }

  canAddMenuItem() {
    return Object.keys(this.children).length < 3;
  }

  getMenuItem(id) {
    console.log("GETTING MENU ITEM");
    console.log(id);
    console.log(this.children);
    return this.children[id];
  }

  getCallToActionsForRequest() {
    return _.map(this.children, (menuItem, key) => {
      switch(menuItem.type) {
        case 'web_url':
          return {
            type: menuItem.type,
            title: menuItem.title,
            url: menuItem.url
          };
        case 'postback':
          return {
            type: menuItem.type,
            title: menuItem.title,
            postback: menuItem.postback
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
}

export default SubMenu;

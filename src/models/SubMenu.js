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
    return this.children[id];
  }
}

export default SubMenu;

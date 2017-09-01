import MenuItem from './MenuItem';

class PersistentMenu {
  constructor(locale, composerInputDisabled) {
    this.locale = locale || 'default';
    this.composer_input_disabled = composerInputDisabled || true;
    const rootMenu = new MenuItem('root', {id: 'root', level: -1}, {type: 'nested'});
    rootMenu.id = 'root';
    this.menuItems = {root: rootMenu};
    this.idCount = 0;
  }

  static constructFromPrevious(previous) {
    const result = new PersistentMenu(previous.locale, previous.composer_input_disabled);
    let newMenuItem;
    previous.call_to_actions.forEach(callToAction => {
      newMenuItem = MenuItem.constructFromPreviousAndAddToMenu(callToAction, result.getMenuItem('root'), result);
    });
    return result;
  }

  createBodyForRequest() {
    const menu = {
      locale: this.locale,
      composer_input_disabled: this.composer_input_disabled,
      call_to_actions: this.menuItems['root'].getCallToActionsForRequest()
    };

    const result = {
      persistent_menu: [menu]
    };

    return result;
  }

  addMenuItem(menuItem, subMenuId) {
    const id = this.getId();
    menuItem.id = id;
    this.menuItems[id] = menuItem;
    this.menuItems[subMenuId].addChild(menuItem);
    return menuItem;
  }

  getMenuItem(id) {
    return this.menuItems[id];
  }

  editMenuItem(type, menuItemId) {
    this.getMenuItem(menuItemId).setType(type);
  }

  deleteMenuItem(id) {
    delete this.menuItems[this.getMenuItem(id).parent].children[id];
    delete this.menuItems[id];
  }

  getId() {
    return '' + ++this.idCount;
  }

}

export default PersistentMenu;

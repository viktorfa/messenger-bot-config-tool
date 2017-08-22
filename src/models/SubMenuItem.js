import _ from 'lodash';

class SubMenuItem {
  constructor(parent, title, id) {
    this.parent = parent;
    this.title = title;
    this.id = id;
  }

  setTitle(title) {
    this.title = title;
  }

  getRoot() {
    if (_.isNull(this.parent)) {
      return this;
    } else {
      return this.parent;
    }
  }
}

export default SubMenuItem;

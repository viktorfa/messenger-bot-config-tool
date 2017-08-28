import _ from 'lodash';

class CallToAction {
  constructor(type, title, parent, id) {
    this.type = type;
    this.title = title;
    this.parent = parent;
    this.id = id;
  }

  setType(type) {
    this.type = type;
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

export default CallToAction;

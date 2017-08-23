import SubMenuItem from './SubMenuItem';

class CallToAction extends SubMenuItem {
  constructor(type, title, parent, id) {
    super(parent, title, id);
    this.type = type;
  }

  setType(type) {
    this.type = type;
  }
}

export default CallToAction;

import {expect} from 'chai';
import _ from 'lodash';
import {getInitialPersistentMenu} from '../src/reducers/persistentMenuReducer';
import PersistentMenu from '../src/models/PersistentMenu';

describe('Persistent Menu', () => {
  let persistentMenu;
  beforeEach(() => {
    persistentMenu = getInitialPersistentMenu();
  });

  it('should be able to return a body for the request to Facebook Messenger', () => {
    const actual = persistentMenu.createBodyForRequest();
    const actualAsJson = JSON.stringify(actual);
    console.log(actual);
    console.log(actualAsJson);
  });

  it('should be able to construct a PersistentMenu object from an object as it in represented from Facebook', () => {
    const originalObject = _.cloneDeep(persistentMenuObject);
    const actual = PersistentMenu.constructFromPrevious(originalObject);
    expect(Object.keys(actual.menuItems).length).to.equal(6);
    expect(_.find(actual.menuItems, menuItem => menuItem.title === 'Contact Info'))
  });

});

const persistentMenuObject = {
  locale: "default",
  composer_input_disabled: true,
  call_to_actions: [
    {
      title: "My Account",
      type: "nested",
      call_to_actions: [
        {
          title: "Pay Bill",
          type: "postback",
          payload: "PAYBILL_PAYLOAD"
        },
        {
          title: "History",
          type: "postback",
          payload: "HISTORY_PAYLOAD"
        },
        {
          title: "Contact Info",
          type: "postback",
          payload: "CONTACT_INFO_PAYLOAD"
        }
      ]
    },
    {
      type: "web_url",
      title: "Latest News",
      url: "http://petershats.parseapp.com/hat-news",
      webview_height_ratio: "full"
    }
  ]
};

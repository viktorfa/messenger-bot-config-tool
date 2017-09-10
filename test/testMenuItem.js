import {expect} from 'chai';
import MenuItem from '../src/models/MenuItem';

const mockParent = {
  id: 1,
  level: 0,
};

const fullWebUrlButtonObject = {
  type: 'web_url',
  url: 'http://example.com',
  webview_height_ratio: 'tall',
  messenger_extensions: 'true',
  fallback_url: 'http://my.website.com/welcome',
  webview_share_button: 'hide'
};

describe('Web url button', () => {
  it('simple test', () => {
    const expectedUrl = 'http://example.com';
    const webUrlButton = new MenuItem('Url button', mockParent, {url: expectedUrl});
    expect(webUrlButton.url).to.equal(expectedUrl);
  });

  it('should be able to add all possible fields for web_url button', () => {
    const fullWebUrlButton = new MenuItem('Full url button', mockParent, fullWebUrlButtonObject);
    Object.keys(fullWebUrlButtonObject).forEach(key => {
      expect(fullWebUrlButtonObject[key] === fullWebUrlButton[key]);
    });
  });

  it('should be able to update its option fields easily', () => {
    const fullWebUrlButton = new MenuItem('Full url button', mockParent, fullWebUrlButtonObject);
    const newOptions = {
      webview_height_ratio: 'compact',
      messenger_extensions: 'false',
      webview_share_button: ''
    };
    fullWebUrlButton.setOptionFields(newOptions);
    Object.keys(newOptions).forEach(key => {
      expect(fullWebUrlButton[key]).to.equal(newOptions[key]);
    });
    const webUrlButton = new MenuItem('Url button', mockParent, {url: 'http://example.com/about'});
    fullWebUrlButton.setOptionFields(newOptions);
    Object.keys(newOptions).forEach(key => {
      expect(fullWebUrlButton[key]).to.equal(newOptions[key]);
    });
  });

  it('should not update other fields than option fields with the setOptionFields method', () => {
    const fullWebUrlButton = new MenuItem('Full url button', mockParent, fullWebUrlButtonObject);
    const newOptions = {
      webview_height_ratio: 'compact',
      messenger_extensions: 'false',
      webview_share_button: '',
      payload: 'BAD PAYLOAD!!!',
      parent: {}
    };
    fullWebUrlButton.setOptionFields(newOptions);
    expect(fullWebUrlButton.payload).to.not.equal(newOptions.payload);
    expect(fullWebUrlButton.parent).to.not.equal(newOptions.parent);
  });
});

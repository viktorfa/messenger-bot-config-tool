/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import persistentMenuReducer from '../src/reducers/persistentMenuReducer';

describe('persistentMenuReducer', () => {

  let state;

  beforeEach(() => {
    state = persistentMenuReducer(undefined, {type: ''});
    deepFreeze(state);
  });

  it('should be able to edit the composer input disabled value', () => {
    state = persistentMenuReducer(state, {type: 'EDIT_COMPOSER_INPUT_DISABLED', value: false});
    deepFreeze(state);
    expect(state.persistentMenu.composer_input_disabled).to.be.false;
    state = persistentMenuReducer(state, {type: 'EDIT_COMPOSER_INPUT_DISABLED'});
    deepFreeze(state);
    expect(state.persistentMenu.composer_input_disabled).to.be.false;
    state = persistentMenuReducer(state, {type: 'EDIT_COMPOSER_INPUT_DISABLED', value: true});
    deepFreeze(state);
    expect(state.persistentMenu.composer_input_disabled).to.be.true;
    state = persistentMenuReducer(state, {type: 'EDIT_COMPOSER_INPUT_DISABLED', value: true});
    deepFreeze(state);
    expect(state.persistentMenu.composer_input_disabled).to.be.true;
  });

  it('should be able to add an url button to the root menu', () => {
    const action = {
      type: 'ADD_URL_BUTTON',
      title: 'URL BUTTON',
      submenu: 'root',
      url: 'https://inneklemtedager.no',
      webview_height_ratio: 'full'
    };
    state = persistentMenuReducer(state, action);
    deepFreeze(state);
    const actual = state.persistentMenu.call_to_actions.find(menuItem => menuItem.title === action.title);
    expect(actual).to.not.be.undefined;
  })
});

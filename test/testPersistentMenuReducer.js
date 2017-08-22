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
});

/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import {getInitialPersistentMenu} from '../src/reducers/persistentMenuReducer';

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

});

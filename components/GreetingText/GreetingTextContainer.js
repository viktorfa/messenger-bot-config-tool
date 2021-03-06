/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {connect} from 'react-redux';
import GreetingTextComponent from './GreetingTextComponent';


const editText = (text) => {
  return {type: 'EDIT_GREETING_TEXT_TEXT', text};
};

const mapStateToProps = (state) => {
  return {
    greetingText: state.greetingTextReducer.greetingText
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editText: (text) => dispatch(editText(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GreetingTextComponent);

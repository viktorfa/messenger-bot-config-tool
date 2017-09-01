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
import GetStartedComponent from './GetStartedComponent';


const editPayload = (payload) => {
  return {type: 'EDIT_GET_STARTED_PAYLOAD', payload};
};

const mapStateToProps = (state) => {
  return {
    getStartedButton: state.getStartedReducer.getStartedButton
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPayload: (payload) => dispatch(editPayload(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedComponent);

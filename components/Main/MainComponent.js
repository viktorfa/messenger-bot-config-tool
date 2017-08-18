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
import Link from '../Link';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="mdl-cell">
          <p>This is the Main component</p>
          <code>
            {JSON.stringify(this.props)}
          </code>
        </div>

        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col-tablet mdl-cell--6-col">
            Heisann
          </div>
          <div className="mdl-cell mdl-cell--4-col-tablet mdl-cell--6-col">
            <code>{JSON.stringify(this.props.persistentMenu)}</code>
          </div>
        </div>
      </div>
    )
  }
}

export default MainComponent;

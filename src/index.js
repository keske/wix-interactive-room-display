// @flow

import * as React from 'react';
import * as R from 'ramda';

import ReactDOM from 'react-dom';

// Utils
import * as serviceWorker from './utils/serviceWorker';

// Containers
import Root from './containers/Root';

R.pipe(
  () => (
    document.getElementById('root')
  ),
  (root) => {
    ReactDOM.render(<Root />, root);

    serviceWorker.unregister();
  },
)();

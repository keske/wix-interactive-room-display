// @flow

import * as R from 'ramda';
import * as React from 'react';

// Components
//

export default (): React.Node => (
  R.pipe(
    ({ styles }) => (
      <div style={styles.root} />
    ),
  )({
    styles: {
      root: {
        backgroundColor: 'black',
        width: window.innerWidth,
        height: window.innerHeight,
      },
    },
  })
);

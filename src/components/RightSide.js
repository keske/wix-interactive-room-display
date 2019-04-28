// @flow

import * as R from 'ramda';
import * as React from 'react';

export default (): React.Node => (
  R.pipe(
    ({ styles }) => (
      <div style={styles.root} />
    ),
  )({
    styles: {
      root: {
        position: 'absolute',
        zIndex: 1,

        top: 0,
        right: 0,

        width: `${(window.innerWidth - window.innerHeight) / 2}px`,
        height: `${window.innerHeight}px`,
      },
    },
  })
);

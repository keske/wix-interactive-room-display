// @flow

import * as R from 'ramda';
import * as React from 'react';

export default (): React.Node => (
  R.pipe(
    ({ styles }) => (
      <div style={styles.root}>
        <video
          autoPlay
          controls={false}
          height={`${window.innerHeight}px`}
          loop
          width={`${(window.innerWidth - window.innerHeight) / 2}px`}
        >
        <source
          src="http://localhost:3070/video/right.mp4"
          type="video/quicktime"
        />
        </video>
      </div>
    ),
  )({
    styles: {
      root: {
        position: 'absolute',
        zIndex: 100,

        top: 0,
        right: 0,

        width: `${(window.innerWidth - window.innerHeight) / 2}px`,
        height: `${window.innerHeight}px`,
      },
    },
  })
);

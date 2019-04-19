// @flow

import * as R from 'ramda';
import * as React from 'react';

type Props = {
  duration?: number,
  text?: string,
};

export default ({
  duration = 2000,
  text = 'Ticker',
}: Props): React.Node => (
  R.pipe(
    ({ styles }) => (
      <div>
        <style>
          {`
            @-webkit-keyframes ticker {
              0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
                visibility: visible;
              }
              100% {
                -webkit-transform: translate3d(-100%, 0, 0);
                transform: translate3d(-100%, 0, 0);
              }
            }
            @keyframes ticker {
              0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
                visibility: visible;
              }
              100% {
                -webkit-transform: translate3d(-100%, 0, 0);
                transform: translate3d(-100%, 0, 0);
              }
            }
          `}
        </style>
        <div style={styles.root}>
          <div style={styles.ticker}>
            {
              text
            }
          </div>
        </div>
      </div>
    ),
  )({
    styles: {
      root: {
        overflow: 'hidden',
      },
      ticker: {
        animation: `ticker ${duration}ms linear infinite`,
        display: 'inlineBlock',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',

        color: '#FFF',
        fontSize: '50px',
        fontFamily: 'Impact',
      },
    },
  })
);

// @flow

import * as React from 'react';

// Libs
import Wad from 'web-audio-daw';

<<<<<<< HEAD
const ws = new WebSocket('ws://localhost:8080/');
=======
const ws = new WebSocket(
  process.env.REACT_APP_STAGE === 'production'
    ? 'ws://134.209.218.211:8080/'
    : 'ws://localhost:8080/',
);
>>>>>>> efb67b9100ad69c7aaa4c0e5c5c9bc6556ced357

type Props = any;

export default class Sample extends React.Component<Props> {

  componentDidMount = () => {
    this.init();
  }

  init = () => {
    ws.onmessage = ({ data }) => {
      const sample = JSON.parse(data);

      this.play(sample);
    };
  }

  play = ({ delay, source }) => {
    const sample = (
      new Wad({
        delay,
        source,
      })
    );

    sample.play();
  }

  render = () => false;

}

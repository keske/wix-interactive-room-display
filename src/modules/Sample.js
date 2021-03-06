// @flow

import * as React from 'react';

// Libs
import Wad from 'web-audio-daw';

const ws = new WebSocket('ws://localhost:8080/');

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

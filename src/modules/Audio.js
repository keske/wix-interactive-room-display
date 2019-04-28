// @flow

// import * as R from 'ramda';
import * as React from 'react';

// Libs
// import axios from 'axios';
import Wad from 'web-audio-daw';

type Props = {
  children: any,
};

type State = {
  pitch: number,
};

export default class Audio extends React.Component<Props, State> {

  state = {
    pitch: 0,
  }

  componentDidMount = () => {
    this.init();
  }

  init = () => {
    const mic = new Wad({ source: 'mic' });
    const tuner = new Wad.Poly();

    tuner.setVolume(0);
    tuner.add(mic);

    mic.play();

    tuner.updatePitch();

    const listen = () => {
      this.setState({
        pitch: tuner.pitch,
      });

      setTimeout(() => {
        listen();
      }, 500);
    };

    listen();
  }

  render = () => {
    const { children } = this.props;

    return children(this.state);
  }

}

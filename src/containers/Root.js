// @flow

import * as R from 'ramda';
import * as React from 'react';

import axios from 'axios';

// Components
import { Scene, cube } from '../@libs/Three';

// Types
import type { Acceleration, Mouse, Screen } from '../types';

type Props = {
  acceleration?: Acceleration,
  mouse?: Mouse,
  screen?: Screen,
};

type State = {
  objects: Array<*>,
};

export default class Root extends React.Component<Props, State> {

  static defaultProps = {
    acceleration: {
      x: 0,
      y: 0,
      z: 0,
    },
    mouse: {
      x: 0,
      y: 0,
    },
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  }

  state = {
    objects: [],
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this.fetchData(), 30);
  }

  fetchData = () => {
    axios
      .get('http://localhost:3030/')
      .then(({ data: devices, status }) => {
        const objects = [];

        if (R.equals(status, 200)) {
          // eslint-disable-next-line
          R.map((device) => {
            // eslint-disable-next-line
            R.map(({ animate, render }) => {
              // Cube
              if (R.equals(render.type, 'cube')) {
                objects.push({
                  animate,
                  object: cube(),
                });
              }
            })(device.objects);
          })(devices);

          this.setState(() => ({
            objects,
          }));
        }
      });
  }

  timer: any

  render = () => {
    const { objects } = this.state;
    const { screen: { width, height } } = this.props;

    // console.log('objects');
    // console.log(objects);

    return (
      R.pipe(
        ({ styles }) => (
          <div style={styles.root}>
            {
              R.not(R.isEmpty(objects)) && (
                <Scene
                  {...this.props}
                  {...{ objects }}
                >
                  {
                    (/* { scene } */) => false
                  }
                </Scene>
              )
            }
          </div>
        ),
      )({
        styles: {
          root: {
            backgroundColor: 'black',
            width,
            height,
          },
        },
      })
    );
  }

}

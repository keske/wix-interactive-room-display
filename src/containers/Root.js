// @flow

import * as R from 'ramda';
import * as React from 'react';

import axios from 'axios';

// Libs
import Scene, { sphere } from '../@libs/Three';

// Components
import Cube from '../components/Cube';

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
      x: 600,
      y: 600,
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

        if (R.equals(status, 200) && R.not(R.isEmpty(devices))) {
          // eslint-disable-next-line
          R.map((device) => {
            // eslint-disable-next-line
            R.map(({ animate, render }) => {
              // Cube
              // if (R.equals(render.type, 'cube')) {
              //   objects.push({
              //     animate,
              //     object: cube(),
              //   });
              // }
              // Lens
              if (R.equals(render.type, 'sphere')) {
                objects.push({
                  animate,
                  object: sphere(),
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
    const {
      mouse,
      screen: {
        width,
        height,
      },
    } = this.props;

    return (
      R.pipe(
        ({ styles }) => (
          <div style={styles.root}>
            {
              R.not(R.isEmpty(objects)) && (
                <div style={styles.scene}>
                  <Scene
                    {...this.props}
                    {...{ objects }}
                  >
                    {
                      (/* { scene } */) => false
                    }
                  </Scene>
                </div>
              )
            }
            <Cube {...{ mouse }} />
          </div>
        ),
      )({
        styles: {
          root: {
            position: 'absolute',
            zIndex: 1,

            backgroundColor: 'black',
            width,
            height,
          },
          scene: {
            position: 'absolute',
            zIndex: 10,
          },
        },
      })
    );
  }

}

// @flow

import * as R from 'ramda';
import * as React from 'react';

import axios from 'axios';

// Libs
import Scene, {
  circle,
  cone,
  cube,
  dodecahedron,
  knot,
  octahedron,
  sphere,
  tetrahedron,
  torus,
} from '../@libs/Three';

// Components
import Cube from '../components/Cube';
import LeftSide from '../components/LeftSide';
import RightSide from '../components/RightSide';

// Modules
import Sample from '../modules/Sample';

// Types
import type { Acceleration, Mouse, Screen } from '../types';

type Props = {
  acceleration?: Acceleration,
  geometry?: any,
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
    geometry: {
      circle: circle(),
      cone: cone(),
      cube: cube(),
      dodecahedron: dodecahedron(),
      knot: knot(),
      octahedron: octahedron(),
      sphere: sphere(),
      tetrahedron: tetrahedron(),
      torus: torus(),
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
    const { geometry } = this.props;

    axios
      .get('http://localhost:3070/')
      .then(({ data: devices, status }) => {
        const objects = [];

        if (R.equals(status, 200) && R.not(R.isEmpty(devices))) {
          // eslint-disable-next-line
          R.map((device) => {
            // eslint-disable-next-line
            R.map(({ animate, render }) => {
              objects.push({
                animate,
                object: geometry[render.type],
              });
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
            <Cube {...{ mouse, pitch: 1 }} />
            <LeftSide />
            <RightSide />
            <Sample />
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

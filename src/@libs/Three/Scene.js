// @flow

import * as R from 'ramda';
import * as React from 'react';
import * as THREE from 'three';

// Types
import type { Screen } from '../../types';

type CameraConfig = {
  frustumVerticalFieldOfView: number,
  frustumAspectRatio: number,
  frustumNearPlane: number,
  frustumFarPlane: number,
};

type Props = {
  camera?: CameraConfig,
  children: any,
  objects: Array<*>,
  screen: Screen,
};

type State = {
  loaded: boolean,
};

export default class Scene extends React.Component<Props, State> {

  static defaultProps = {
    camera: {
      frustumVerticalFieldOfView: 75,
      frustumAspectRatio: (window.innerWidth / window.innerHeight),
      frustumNearPlane: 0.1,
      frustumFarPlane: 100000,
    },
  }

  state = {
    loaded: false,
  }

  setScene = () => {
    this.scene = (
      new THREE.Scene()
    );
  }

  setCamera = () => {
    const {
      camera: {
        frustumVerticalFieldOfView,
        frustumAspectRatio,
        frustumNearPlane,
        frustumFarPlane,
      },
    } = this.props;

    this.camera = (
      new THREE.PerspectiveCamera(
        frustumVerticalFieldOfView,
        frustumAspectRatio,
        frustumNearPlane,
        frustumFarPlane,
      )
    );

    this.camera.position.z = 300;
  }

  setRendener = () => {
    const {
      screen: {
        width,
        height,
      },
    } = this.props;

    this.renderer = (
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
    );

    // this.renderer.setClearColor(0x000000, 0);
    this.renderer.setClearColor('black');
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
  }

  addObjects = () => {
    const { objects } = this.props;

    // eslint-disable-next-line
    objects.map(({ object }) => {
      this.scene.add(object);
      this.objects.push(object);
    });
  }

  animateObjects = () => {
    const { objects } = this.props;

    // eslint-disable-next-line
    objects.map(({ animate }, index) => {
      setTimeout(() => {
        // eslint-disable-next-line
        R.keys(animate).map((property) => {
          // eslint-disable-next-line
          R.keys(animate[property]).map((key) => {
            this.objects[index][property][key] = animate[property][key];
          });
        });
      }, objects[index].timeOut || 0);
    });
  }

  componentDidMount = () => {
    this.setScene();
    this.setCamera();
    this.setRendener();

    this.addObjects();

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount = () => {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      // eslint-disable-next-line
      this.frameId = requestAnimationFrame(this.animate);

      this.setState({
        loaded: true,
      });
    }
  }

  stop = () => {
    // eslint-disable-next-line
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.animateObjects();

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  camera: any

  frameId: any

  mount: any

  objects: any = []

  renderer: any

  scene: any

  render = () => {
    const { loaded } = this.state;
    const {
      screen: {
        width,
        height,
      },
    } = this.props;

    return (
      <div
        ref={(mount) => {
          this.mount = mount;
        }}
        style={{
          width,
          height,

          position: 'absolute',
          zIndex: 0,
        }}
      >
        {
          loaded && (
            this.props.children({
              scene: this.scene,
            })
          )
        }
      </div>
    );
  }

}

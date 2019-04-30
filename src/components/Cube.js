// @flow

import * as React from 'react';

// Types
import type { MouseOrTouchPosition } from '../types';

type Props = {
  mouse: MouseOrTouchPosition,
  size?: number,
  pitch: any,
};

export default ({
  mouse,
  size = window.innerHeight / 2,
  pitch,
}: Props): React.Node => (
  <div>
    <style>
      {`
        .root {
          position: 'absolute';
          zIndex: 1;
          padding-top: ${(window.innerHeight / 2) - (size / 2)}px;
          padding-left: ${(window.innerWidth / 2) - (size / 2)}px;
        }
        .wrap {
          perspective: ${size}px;
          perspective-origin: 20% ${size / 2}px;
          // perspective: ${(mouse.x / 2)}px;
          // perspective-origin: ${(mouse.y / 20)}% ${size / 2}px;
          // transform: scale(${mouse.x / 800});
          animation-duration: 750ms;
          // transform: scale(${pitch * 0.0001});
        }
        .cube {
          position: relative;
          width: ${size}px;
          transform-style: preserve-3d;
        }
        .cube div {
          position: absolute;
          width: ${size}px;
          height: ${size}px;

          // border: 1px solid red;
        }
        .back {
          transform: translateZ(-${size / 2}px) rotateY(180deg);
        }
        .back .invert {
          transform: scaleX(-1);
        }
        .right {
          transform: rotateY(-270deg) translateX(${size / 2}px);
          transform-origin: top right;
        }
        .right .invert {
          transform: scaleX(-1);
        }
        .left {
          transform: rotateY(270deg) translateX(-${size / 2}px);
          transform-origin: center left;
        }
        .left .invert {
          transform: scaleX(-1);
        }
        .top {
          transform: rotateX(-90deg) translateY(-${size / 2}px);
          transform-origin: top center;
        }
        .top .invert {
          transform: scaleY(1);
        }
        .bottom {
          transform: rotateX(90deg) translateY(${size / 2}px);
          transform-origin: bottom center;
        }
      `}
    </style>
    <div className="root">
      <div className="wrap">
        <div className="cube">
          <div className="back">
            <div className="invert">
              <img
                height={`${size}px`}
<<<<<<< HEAD
                src="http://localhost:3070/cube/back.png"
=======
                src="http://134.209.218.211:3070/cube/back.png"
>>>>>>> efb67b9100ad69c7aaa4c0e5c5c9bc6556ced357
                width={`${size}px`}
              />
            </div>
          </div>
          <div className="top">
            <div className="invert">
              <img
                height={`${size}px`}
<<<<<<< HEAD
                src="http://localhost:3070/cube/top.png"
=======
                src="http://134.209.218.211:3070/cube/top.png"
>>>>>>> efb67b9100ad69c7aaa4c0e5c5c9bc6556ced357
                width={`${size}px`}
              />
            </div>
          </div>
          <div className="bottom">
            <div className="invert">
              <img
                height={`${size}px`}
<<<<<<< HEAD
                src="http://localhost:3070/cube/bottom.png"
=======
                src="http://134.209.218.211:3070/cube/bottom.png"
>>>>>>> efb67b9100ad69c7aaa4c0e5c5c9bc6556ced357
                width={`${size}px`}
              />
            </div>
          </div>
          <div className="left">
            <div className="invert">
              <img
                height={`${size}px`}
<<<<<<< HEAD
                src="http://localhost:3070/cube/left.png"
=======
                src="http://134.209.218.211:3070/cube/left.png"
>>>>>>> efb67b9100ad69c7aaa4c0e5c5c9bc6556ced357
                width={`${size}px`}
              />
            </div>
          </div>
          <div className="right">
            <div className="invert">
              <img
                height={`${size}px`}
<<<<<<< HEAD
                src="http://localhost:3070/cube/right.png"
=======
                src="http://134.209.218.211:3070/cube/right.png"
>>>>>>> efb67b9100ad69c7aaa4c0e5c5c9bc6556ced357
                width={`${size}px`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

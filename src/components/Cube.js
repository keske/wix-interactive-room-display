// @flow

import * as React from 'react';

// Types
import type { MouseOrTouchPosition } from '../types';

type Props = {
  mouse: MouseOrTouchPosition,
  size?: number,
};

export default ({
  mouse,
  size = window.innerHeight / 2,
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
        .front {
          transform: translateZ(${size / 2}px);
        }
      `}
    </style>
    <div className="root">
      <div className="wrap">
        <div className="cube">
          {
            // <div className="front">front</div>
          }
          <div className="back">
            <div className="invert">
              <img
                height={`${size}px`}
                src="https://payload.cargocollective.com/1/1/45123/13845407/CENTER_2.png"
                width={`${size}px`}
              />
            </div>
          </div>
          <div className="top">
            <div className="invert">
              <img
                height={`${size}px`}
                src="https://payload.cargocollective.com/1/1/45123/13845407/UP.png"
                width={`${size}px`}
              />
            </div>
          </div>
          <div className="bottom">
            <div className="invert">
              <img
                height={`${size}px`}
                src="https://payload.cargocollective.com/1/1/45123/13845407/DOWN.png"
                width={`${size}px`}
              />
            </div>
          </div>
          <div className="left">
            <div className="invert">
              <img
                height={`${size}px`}
                src="https://payload.cargocollective.com/1/1/45123/13845407/LEFT_3.png"
                width={`${size}px`}
              />
            </div>
          </div>
          <div className="right">
            <div className="invert">
              <img
                height={`${size}px`}
                src="https://payload.cargocollective.com/1/1/45123/13845407/RIGHT_4.png"
                width={`${size}px`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

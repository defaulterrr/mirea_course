/* eslint-disable react/prop-types */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ALIVE_COLOR = '#a9ff70';
const DEAD_COLOR = 'gray';

export default ({
  scale, x, y, dead,
}) => (
  <ReactCSSTransitionGroup
    transitionName="segment"
    transitionAppear
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={false}
  >
    <div
      className
      style={{
        position: 'absolute',
        top: (scale * y),
        left: (scale * x),
        height: scale,
        width: scale,
        backgroundColor: dead ? DEAD_COLOR : ALIVE_COLOR,
      }}
    />
  </ReactCSSTransitionGroup>
);

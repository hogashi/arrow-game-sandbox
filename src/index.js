// gm.js

import * as React from 'react';
import ReactDOM from 'react-dom';

import Game from './game';

console.log('gm.js loaded');

ReactDOM.render(
  <Game />,
  document.querySelector('#root')
);

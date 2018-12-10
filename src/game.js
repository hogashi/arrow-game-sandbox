// game.js

import * as React from 'react';
import ReactDOM from 'react-dom';

const NONE  = 0;
const UP    = 1;
const RIGHT = 2;
const DOWN  = 3;
const LEFT  = 4;

const ARROWS = [
  '',
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft'
];

const boards = [
  [
    `   :     :`,
    `   :     :`,
    `''':''''':'''`,
    `   :  ^  :`,
    `   :     :`,
    `''':''''':'''`,
    `   :     :`
  ].join('\n'),
  [
    `   :     :`,
    `   :  |  :`,
    `''':''|  :`,
    `   :  ^  :`,
    `   :     :`,
    `''':''''':'''`,
    `   :     :`,
  ].join('\n'),
  [
    `   :     :`,
    `   :     :`,
    `''':''''':'''`,
    `   :  ^-----`,
    `   :`,
    `''':'''''''''`,
    `   :`,
  ].join('\n'),
  [
    `   :     :`,
    `   :     :`,
    `''':''''':'''`,
    `   :  ^  :`,
    `   :  |  :`,
    `''':''|  :`,
    `   :     :`,
  ].join('\n'),
  [
    `   :     :`,
    `   :     :`,
    `''':''''':'''`,
    ` -----^  :`,
    `         :`,
    `''''''''':'''`,
    `         :`
  ].join('\n')
];

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: NONE,
    }

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyDown(e) {
    console.log(e.key);
    switch(e.key) {
      case ARROWS[UP]:
        this.setState({
          direction: UP,
        });
        break;
      case ARROWS[RIGHT]:
        this.setState({
          direction: RIGHT,
        });
        break;
      case ARROWS[DOWN]:
        this.setState({
          direction: DOWN,
        });
        break;
      case ARROWS[LEFT]:
        this.setState({
          direction: LEFT,
        });
        break;
      default:
        console.log('not arrow');
        break;
    }
  }

  onKeyUp(e) {
    console.log(e.key);
    if (e.key === ARROWS[this.state.direction]) {
      this.setState({
        direction: NONE,
      });
    }
  }

  render() {
    return (
      <div id="game">
        <pre>{boards[this.state.direction]}</pre>
      </div>
    );
  }
}



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
      queue: [0, -1, -1, -1, -1],
      count: 0,
    };

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  getDirection() {
    const { queue } = this.state;
    return queue.reduce((maxIdx, cur, curIdx) => queue[maxIdx] > cur ? maxIdx : curIdx, 0);
  }

  onKeyDown(e) {
    console.log(e.key);
    const { queue } = this.state;
    const count = this.state.count + 1;
    switch(e.key) {
      case ARROWS[UP]:
        queue[UP] = count;
        break;
      case ARROWS[RIGHT]:
        queue[RIGHT] = count;
        break;
      case ARROWS[DOWN]:
        queue[DOWN] = count;
        break;
      case ARROWS[LEFT]:
        queue[LEFT] = count;
        break;
      default:
        console.log('not arrow');
        return;
    }
    this.setState({ queue, count });
  }

  onKeyUp(e) {
    console.log(e.key);
    const { queue } = this.state;
    switch(e.key) {
      case ARROWS[UP]:
        queue[UP] = -1;
        break;
      case ARROWS[RIGHT]:
        queue[RIGHT] = -1;
        break;
      case ARROWS[DOWN]:
        queue[DOWN] = -1;
        break;
      case ARROWS[LEFT]:
        queue[LEFT] = -1;
        break;
      default:
        console.log('not arrow');
        return;
    }
    this.setState({ queue });
    if (this.getDirection() === NONE) {
      this.setState({
        count: 0,
      });
    }
  }

  render() {
    console.log(this.state.queue);
    return (
      <div id="game">
        <pre>{boards[this.getDirection()]}</pre>
      </div>
    );
  }
}



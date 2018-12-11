// game.js

import * as React from 'react';
import ReactDOM from 'react-dom';

const NONE  = 0;
const UP    = 1;
const RIGHT = 2;
const DOWN  = 3;
const LEFT  = 4;

const ARROWS = {
  ArrowUp: UP,
  ArrowRight: RIGHT,
  ArrowDown: DOWN,
  ArrowLeft: LEFT,
};

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
      counts: [0, -1, -1, -1, -1],
      count: 0,
    };

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  getDirection() {
    const { counts } = this.state;
    return counts.reduce((maxIdx, cur, curIdx) => counts[maxIdx] > cur ? maxIdx : curIdx, 0);
  }

  onKeyDown(e) {
    console.log(e.key);
    const index = ARROWS[e.key];
    if (index !== undefined) {
      const counts = [...this.state.counts];
      const count = this.state.count + 1;
      counts[index] = count;
      this.setState({ counts, count });
    }
  }

  onKeyUp(e) {
    console.log(e.key);
    const index = ARROWS[e.key];
    if (index !== undefined) {
      const counts = [...this.state.counts];
      counts[index] = -1;
      this.setState({ counts });
      if (this.getDirection() === NONE) {
        this.setState({
          count: 0,
        });
      }
    }
  }

  render() {
    console.log(this.state.counts);
    return (
      <div id="game">
        <pre>{boards[this.getDirection()]}</pre>
      </div>
    );
  }
}

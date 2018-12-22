// game.js

import * as React from 'react';

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

const BOARDS = [
  [
    '   :     :   ',
    '   :     :   ',
    '```:`````:```',
    '   :  ^  :   ',
    '   :     :   ',
    '```:`````:```',
    '   :     :   '
  ].join('\n'),
  [
    '   :     :   ',
    '   :  |  :   ',
    '```:``|  :   ',
    '   :  ^  :   ',
    '   :     :   ',
    '```:`````:```',
    '   :     :   ',
  ].join('\n'),
  [
    '   :     :   ',
    '   :     :   ',
    '```:`````:```',
    '   :  ^----- ',
    '   :         ',
    '```:`````````',
    '   :         ',
  ].join('\n'),
  [
    '   :     :   ',
    '   :     :   ',
    '```:`````:```',
    '   :  ^  :   ',
    '   :  |  :   ',
    '```:``|  :   ',
    '   :     :   ',
  ].join('\n'),
  [
    '   :     :   ',
    '   :     :   ',
    '```:`````:```',
    ' -----^  :   ',
    '         :   ',
    '`````````:```',
    '         :   '
  ].join('\n')
];

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: NONE,
      counts: [0, -1, -1, -1, -1],
      count: 0,
    };

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  updateDirection() {
    const { counts } = this.state;
    let { count } = this.state;
    const direction = counts.reduce((maxIdx, cur, curIdx) => counts[maxIdx] > cur ? maxIdx : curIdx, 0);
    if (direction === NONE) {
      count = 0;
    }
    this.setState({ direction, count });
  }

  onKeyDown(e) {
    console.log('keydown', e.key);
    const index = ARROWS[e.key];
    // 矢印キー以外のとき何もしない
    // 最新の押されているキーと同じなら何もしない(長押しで沢山イベント発火するので)
    if (index === undefined || index === this.state.direction) {
      return;
    }
    const direction = index;
    const counts = [...this.state.counts];
    const count = this.state.count + 1;
    counts[index] = count;
    this.setState({ direction, counts, count });
  }

  onKeyUp(e) {
    console.log('keyup', e.key);
    const index = ARROWS[e.key];
    if (index === undefined) {
      return;
    }
    const counts = [...this.state.counts];
    counts[index] = -1;
    this.setState({ counts });
    this.updateDirection();
  }

  render() {
    console.log(this.state.counts);
    return (
      <div id='game'>
        <pre>{BOARDS[this.state.direction]}</pre>
      </div>
    );
  }
}

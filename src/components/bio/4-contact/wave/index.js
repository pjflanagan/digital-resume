import React from "react";

import * as Style from "./style.module.scss";

const MAX_HEIGHT = 62;
const FLUX = 12;
const SPEED = 0.2;
const GAP = 8;
const FRAME_RATE = 64;
const MAX_OFFSET = 40;

const getNextHeight = (pos) => {
  return Math.abs(
    MAX_HEIGHT * Math.sin(-pos) + (Math.random() * FLUX) / 2 - FLUX
  );
};

const getOffset = (x) => {
  return Math.sin(x) * MAX_OFFSET;
}

const incrementPos = (pos) => {
  return pos + SPEED;
}

const initState = (count) => {
  let pos = 0;
  const wave = [];
  for (let i = 0; i < count; ++i) {
    pos = incrementPos(pos);
    wave.unshift(getNextHeight(pos));
  }
  return {
    pos,
    wave
  };
}

class Wave extends React.Component {
  constructor(props) {
    super(props);
    this.interval = 0;

    this.state = initState(32);

    this.shiftBars = this.shiftBars.bind(this);
  }

  componentDidMount() {
    const count = Math.ceil(window.innerWidth / (GAP * 2));
    this.setState(initState(count));
  }

  componentDidUpdate(prevProps) {
    const { on } = this.props;
    if (on && !prevProps.on) {
      this.interval = setInterval(this.shiftBars, FRAME_RATE);
    } else if (!on && prevProps.on) {
      clearInterval(this.interval);
    }
  }

  shiftBars() {
    const { pos, wave } = this.state;
    const newPos = incrementPos(pos);
    wave.pop();
    wave.unshift(getNextHeight(newPos));
    this.setState({
      pos: newPos,
      wave
    });
  }

  render() {
    const { wave, pos } = this.state;
    const { open } = this.props;
    return (
      <div className={Style.waveHolder}>
        {wave.map((height, i) => (
          <div
            key={i}
            className={Style.bar}
            style={{
              height: `${open ? height : 4}%`,
              margin: `${getOffset(pos + SPEED * i)}px ${GAP}px`
            }}
          />
        ))}
      </div>
    );
  }
}

export { Wave };

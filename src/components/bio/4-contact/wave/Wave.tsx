import { useEffect, useState } from 'react';
import clsx from 'clsx';

import * as Style from './Wave.module.scss';

const MAX_HEIGHT = 62;
const FLUX = 12;
const SPEED = 0.2;
const GAP = 8;
const FRAME_RATE = 64;
const MAX_OFFSET = 40;
const INITIAL_BAR_COUNT = 32;
const REVEAL_STAGGER_MS = 15;
const REVEAL_DURATION_MS = 400;

const getNextHeight = (pos: number): number => {
  return Math.abs(MAX_HEIGHT * Math.sin(-pos) + (Math.random() * FLUX) / 2 - FLUX);
};

const getOffset = (x: number): number => {
  return Math.sin(x) * MAX_OFFSET;
};

type WaveState = {
  pos: number;
  wave: number[];
};

const initState = (count: number): WaveState => {
  let pos = 0;
  const wave: number[] = [];
  for (let i = 0; i < count; ++i) {
    pos += SPEED;
    wave.unshift(getNextHeight(pos));
  }
  return {
    pos,
    wave,
  };
};

const shiftBars = ({ pos, wave }: WaveState): WaveState => {
  const newPos = pos + SPEED;
  return {
    pos: newPos,
    wave: [getNextHeight(newPos), ...wave.slice(0, -1)],
  };
};

type WaveProps = {
  on: boolean;
  revealed: boolean;
};

const Wave = ({ on, revealed }: WaveProps) => {
  const [{ pos, wave }, setState] = useState<WaveState>(() => initState(INITIAL_BAR_COUNT));
  const [settled, setSettled] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- intentional: size the
     wave to the viewport once mounted (no window during SSR) */
  useEffect(() => {
    setState(initState(Math.ceil(window.innerWidth / (GAP * 2))));
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!on) {
      return;
    }
    const interval = setInterval(() => setState(shiftBars), FRAME_RATE);
    return () => clearInterval(interval);
  }, [on]);

  useEffect(() => {
    if (!revealed || settled) {
      return;
    }
    const timeout = setTimeout(
      () => setSettled(true),
      wave.length * REVEAL_STAGGER_MS + REVEAL_DURATION_MS
    );
    return () => clearTimeout(timeout);
  }, [revealed, settled, wave.length]);

  return (
    <div className={clsx(Style.waveHolder, { [Style.revealed]: revealed })}>
      {wave.map((height, i) => (
        <div
          key={i}
          className={Style.bar}
          style={{
            transform: `translate(0, calc(-50% + ${getOffset(pos + SPEED * i)}px)) scaleY(${height / 100})`,
            margin: `0 ${GAP}px`,
            transitionDelay: revealed && !settled ? `${i * REVEAL_STAGGER_MS}ms` : '0s',
            transitionDuration: settled ? undefined : `${REVEAL_DURATION_MS}ms`,
          }}
        />
      ))}
    </div>
  );
};

export { Wave };

import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import { Random } from 'src/helpers';

import * as Style from './PunchCard.module.scss';

type PunchCardProps = {
  revealed: boolean;
  replayToken?: number;
};

const PUNCH_ROW_COUNT = 10;
const PUNCH_ROW_CHAR_COUNT = 120;
const PUNCH_SQUARE_CHAR = '█';
const PUNCH_SQUARE_CHANCE = 0.15;
const PUNCH_REVEAL_WINDOW_MS = 1600;
const PUNCH_REVEAL_MIN_TICK_MS = 6;
// Punch text starts fading back down (and bullets start fading in) this far into the reveal.
const PUNCH_FADE_START_RATIO = 0.58;
const PUNCH_BULLET_START_DELAY_MS = PUNCH_REVEAL_WINDOW_MS * PUNCH_FADE_START_RATIO;

type Cell = {
  digitChar: string;
  isPunch: boolean;
  col: number;
};

function buildGrid(): { rows: Cell[][] } {
  const rows: Cell[][] = [];

  for (let row = 0; row < PUNCH_ROW_COUNT; row++) {
    const digitChar = String(row);
    const cells: Cell[] = [];
    for (let col = 0; col < PUNCH_ROW_CHAR_COUNT; col++) {
      const isPunch = Random.dec(0, 1) < PUNCH_SQUARE_CHANCE;
      cells.push({ digitChar, isPunch, col });
    }
    rows.push(cells);
  }

  return { rows };
}

enum AnimationState {
  UN_STARTED = 0,
  ANIMATING = 1,
  COMPLETE = 2
}

function PunchCard({ revealed, replayToken = 0 }: PunchCardProps) {
  // eslint-disable-next-line react-hooks/use-memo
  const { rows } = useMemo(buildGrid, [replayToken]);
  const [revealedCol, setRevealedCol] = useState(0);
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.UN_STARTED);

  useEffect(() => {
    if (!revealed) return;
    setRevealedCol(0);
    setAnimationState(AnimationState.ANIMATING);

    const tickMs = Math.max(
      PUNCH_REVEAL_MIN_TICK_MS,
      PUNCH_REVEAL_WINDOW_MS / PUNCH_ROW_CHAR_COUNT
    );
    const interval = setInterval(() => {
      setRevealedCol((col) => {
        const next = col + 1;
        if (next >= PUNCH_ROW_CHAR_COUNT) clearInterval(interval);
        return next;
      });
    }, tickMs);

    const fadeTimeout = setTimeout(() => {
      setAnimationState(AnimationState.COMPLETE);
    }, PUNCH_BULLET_START_DELAY_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [revealed, replayToken]);

  return (
    <div className={Style.punchCard} aria-hidden="true">
      {rows.map((cells, rowIndex) => {
        const segments: React.ReactNode[] = [];
        let buffer = '';
        let key = 0;

        cells.forEach((cell) => {
          if (!cell.isPunch) {
            buffer += cell.digitChar;
            return;
          }
          if (buffer) {
            segments.push(<React.Fragment key={key++}>{buffer}</React.Fragment>);
            buffer = '';
          }
          const isPunched = cell.col < revealedCol;
          segments.push(
            <span key={key++} className={clsx(isPunched && Style.punch)}>
              {isPunched ? PUNCH_SQUARE_CHAR : cell.digitChar}
            </span>
          );
        });
        if (buffer) segments.push(<React.Fragment key={key++}>{buffer}</React.Fragment>);

        return (
          <div
            key={rowIndex}
            className={clsx(Style.punchRow, animationState === AnimationState.COMPLETE && Style.complete)}
          >
            {segments}
          </div>
        );
      })}
    </div>
  );
}

export { PunchCard, PUNCH_BULLET_START_DELAY_MS };

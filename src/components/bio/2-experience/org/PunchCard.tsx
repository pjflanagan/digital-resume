import React, { useEffect, useMemo, useState } from 'react';

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
const PUNCH_REVEAL_MIN_TICK_MS = 10;

type Cell = {
  digitChar: string;
  isPunch: boolean;
  order: number;
};

function buildGrid(): { rows: Cell[][]; punchCount: number } {
  const rows: Cell[][] = [];
  const punchCells: Cell[] = [];

  for (let row = 0; row < PUNCH_ROW_COUNT; row++) {
    const digitChar = String(row);
    const cells: Cell[] = [];
    for (let col = 0; col < PUNCH_ROW_CHAR_COUNT; col++) {
      const isPunch = Random.dec(0, 1) < PUNCH_SQUARE_CHANCE;
      const cell: Cell = { digitChar, isPunch, order: -1 };
      cells.push(cell);
      if (isPunch) punchCells.push(cell);
    }
    rows.push(cells);
  }

  Random.shuffle(punchCells).forEach((cell, i) => {
    cell.order = i;
  });

  return { rows, punchCount: punchCells.length };
}

function PunchCard({ revealed, replayToken = 0 }: PunchCardProps) {
  // eslint-disable-next-line react-hooks/use-memo
  const { rows, punchCount } = useMemo(buildGrid, [replayToken]);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (!revealed || punchCount === 0) return;
    setRevealedCount(0);

    const tickMs = Math.max(PUNCH_REVEAL_MIN_TICK_MS, PUNCH_REVEAL_WINDOW_MS / punchCount);
    const interval = setInterval(() => {
      setRevealedCount((count) => {
        const next = count + 1;
        if (next >= punchCount) clearInterval(interval);
        return next;
      });
    }, tickMs);

    return () => clearInterval(interval);
  }, [revealed, punchCount, replayToken]);

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
          const isPunched = cell.order < revealedCount;
          segments.push(
            <span key={key++} className={Style.punch}>
              {isPunched ? PUNCH_SQUARE_CHAR : cell.digitChar}
            </span>
          );
        });
        if (buffer) segments.push(<React.Fragment key={key++}>{buffer}</React.Fragment>);

        return (
          <div key={rowIndex} className={Style.punchRow}>
            {segments}
          </div>
        );
      })}
    </div>
  );
}

export { PunchCard };

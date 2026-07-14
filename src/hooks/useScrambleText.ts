import { useEffect, useRef, useState } from 'react';

import { useReveal } from './useReveal';

const SCRAMBLE_INTERVAL_MS = 50;
const SETTLE_INTERVAL_MS = 60;

const scrambleText = (text: string, settledCount: number): string =>
  text
    .split('')
    .map((char, i) => {
      if (i < settledCount || char === ' ') {
        return char;
      }
      return String(Math.floor(Math.random() * 10));
    })
    .join('');

type UseScrambleTextProps = {
  text: string;
  // distance from the viewport edge before the element counts as revealed
  gap?: number;
};

// renders as constantly-changing random numbers until scrolled into view,
// then settles one character at a time into the real text
const useScrambleText = <T extends Element>({ text, gap = 0 }: UseScrambleTextProps) => {
  const ref = useRef<T>(null);
  const isRevealed = useReveal({ ref, gap });
  const [displayText, setDisplayText] = useState(() => scrambleText(text, 0));

  useEffect(() => {
    if (!text) {
      return;
    }
    let settledCount = isRevealed ? 0 : -1;
    const interval = setInterval(
      () => {
        if (isRevealed) {
          settledCount += 1;
        }
        setDisplayText(scrambleText(text, Math.max(settledCount, 0)));
        if (settledCount >= text.length) {
          clearInterval(interval);
        }
      },
      isRevealed ? SETTLE_INTERVAL_MS : SCRAMBLE_INTERVAL_MS
    );
    return () => clearInterval(interval);
  }, [text, isRevealed]);

  return { ref, displayText };
};

export { useScrambleText };

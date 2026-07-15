import { useEffect, useRef, useState } from 'react';

import { useReveal } from './useReveal';

const SCRAMBLE_INTERVAL_MS = 50;
const SETTLE_INTERVAL_MS = 60;

// Bopomofo (zhuyin) letters ㄅ–ㄩ
const ZHUYIN_RANGE_START = 0x3105;
const ZHUYIN_RANGE_SIZE = 0x3129 - ZHUYIN_RANGE_START + 1;

const isCJK = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return code >= 0x4e00 && code <= 0x9fff;
};

const randomScrambleChar = (char: string): string => {
  if (isCJK(char)) {
    return String.fromCharCode(ZHUYIN_RANGE_START + Math.floor(Math.random() * ZHUYIN_RANGE_SIZE));
  }
  return String(Math.floor(Math.random() * 10));
};

const scrambleText = (text: string, settledIndices: Set<number>): string =>
  text
    .split('')
    .map((char, i) => {
      if (settledIndices.has(i) || char === ' ' || char === '\n') {
        return char;
      }
      return randomScrambleChar(char);
    })
    .join('');

// order in which each character index settles, shuffled so letters don't
// finish left-to-right
const shuffledSettleOrder = (text: string): number[] => {
  const indices = text
    .split('')
    .map((char, i) => ({ char, i }))
    .filter(({ char }) => char !== ' ' && char !== '\n')
    .map(({ i }) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

type UseScrambleTextProps = {
  text: string;
  // distance from the viewport edge before the element counts as revealed
  gap?: number;
};

// renders as constantly-changing random numbers until scrolled into view,
// then settles into the real text, one character at a time in a random order
const useScrambleText = <T extends Element>({ text, gap = 0 }: UseScrambleTextProps) => {
  const ref = useRef<T>(null);
  const isRevealed = useReveal({ ref, gap });
  const [displayText, setDisplayText] = useState(() => scrambleText(text, new Set()));

  useEffect(() => {
    if (!text) {
      return;
    }
    const settleOrder = shuffledSettleOrder(text);
    const settledIndices = new Set<number>();
    let settledCount = 0;
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: re-scramble right away so a text change restarts the animation without a stale frame */
    setDisplayText(scrambleText(text, settledIndices));
    if (!isRevealed) {
      const interval = setInterval(() => {
        setDisplayText(scrambleText(text, settledIndices));
      }, SCRAMBLE_INTERVAL_MS);
      return () => clearInterval(interval);
    }
    const interval = setInterval(() => {
      settledIndices.add(settleOrder[settledCount]);
      settledCount += 1;
      setDisplayText(scrambleText(text, settledIndices));
      if (settledCount >= settleOrder.length) {
        clearInterval(interval);
      }
    }, SETTLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [text, isRevealed]);

  return { ref, displayText };
};

export { useScrambleText };

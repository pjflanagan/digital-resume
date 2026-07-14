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

const scrambleText = (text: string, settledCount: number): string =>
  text
    .split('')
    .map((char, i) => {
      if (i < settledCount || char === ' ') {
        return char;
      }
      return randomScrambleChar(char);
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
    // re-scramble right away so a text change restarts the animation without a stale frame
    setDisplayText(scrambleText(text, 0));
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

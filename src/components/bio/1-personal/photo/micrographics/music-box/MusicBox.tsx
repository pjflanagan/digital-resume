import { useMemo, type CSSProperties, type ReactNode } from 'react';

import { Random } from 'src/helpers';

import clairDeLuneJson from './clair-de-lune.json';

import * as Style from './MusicBox.module.scss';

// px per eighth-note duration unit, both for a note's on-screen width and its spacing
const NOTE_UNIT_PX = 6;
const NOTE_GAP_PX = 2;

// [letter, duration in eighth-note units] pairs — a decorative pitch/rhythm contour of the
// opening right-hand melody, not a transcription (no octave/accidentals tracked)
const CLAIR_DE_LUNE_MELODY = clairDeLuneJson as [letter: string, duration: number][];

// vertical position (% from top) for each scale degree, low notes sit near the bottom
const NOTE_Y_BY_LETTER: Record<string, number> = {
  C: 85,
  D: 73,
  E: 61,
  F: 49,
  G: 37,
  A: 25,
  B: 13,
};

type Note = {
  x: number;
  width: number;
  y: number;
  delay: number;
};

function layoutNotes(melody: [string, number][]): { notes: Note[]; trackWidth: number } {
  let x = 0;
  const notes = melody.map(([letter, duration]) => {
    const width = duration * NOTE_UNIT_PX - NOTE_GAP_PX;
    const note = { x, width, y: NOTE_Y_BY_LETTER[letter], delay: Random.dec(0, 6) };
    x += duration * NOTE_UNIT_PX;
    return note;
  });
  return { notes, trackWidth: x };
}

function MusicBox(): ReactNode {
  // the flicker timing is randomized per mount so each visit feels alive, not looped
  const { notes, trackWidth } = useMemo(() => layoutNotes(CLAIR_DE_LUNE_MELODY), []);

  // the track scrolls by translateX(-50%), so the notes are duplicated to loop seamlessly
  const trackNotes = [...notes, ...notes.map((note) => ({ ...note, x: note.x + trackWidth }))];

  return (
    <div className={Style.musicBox} aria-hidden>
      <div className={Style.track} style={{ width: trackWidth * 2 } as CSSProperties}>
        {trackNotes.map(({ x, width, y, delay }, i) => (
          <span
            key={i}
            className={Style.note}
            style={
              {
                '--note-x': `${x}px`,
                '--note-width': `${width}px`,
                '--note-delay': `${delay.toFixed(2)}s`,
                '--note-y': `${y.toFixed(1)}%`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

export { MusicBox };

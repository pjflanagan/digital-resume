import type { Point, Range } from 'src/helpers';

// layer population counts
const VIEW_STARS: Range = { min: 34, max: 44 };
const VIEW_BACKGROUND_MOONS: Range = { min: 2, max: 4 };
const VIEW_FOREGROUND_MOONS: Range = { min: 2, max: 4 };

// how far into the page (in viewport heights) the scroll animation completes
const SCROLL_DEPTH = 3;
// the ship drifts backward slightly before launching (proportion of scroll percent)
const SCROLL_BACKPEDAL = 0.08;

// shared across bodies: moons avoid spawning on top of the ship
const SHIP_LAYER = 5;
const SHIP_CENTER: Point = { x: 1 / 6, y: 0.5 }; // proportional to the viewport

// how quickly the virtual mouse eases toward the real mouse each frame (0-1)
const MOUSE_EASE = 0.08;

const BULLET_RADIUS = 2;
const BULLET_SPEED = 12;
const BULLET_COLOR = '#fff';

// dispatched on window when the name in LandingBody is clicked, to make the ship fire
const SHIP_FIRE_EVENT = 'ship:fire';

export {
  VIEW_STARS,
  VIEW_BACKGROUND_MOONS,
  VIEW_FOREGROUND_MOONS,
  SCROLL_DEPTH,
  SCROLL_BACKPEDAL,
  SHIP_LAYER,
  SHIP_CENTER,
  MOUSE_EASE,
  BULLET_RADIUS,
  BULLET_SPEED,
  BULLET_COLOR,
  SHIP_FIRE_EVENT,
};

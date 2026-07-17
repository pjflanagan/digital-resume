// Link shapes rendered by the text elements. Content modules build data in
// these shapes; elements never import content.

import type { FocusArea } from '../focus-frame/FocusFrame';

type ContentLink = {
  key: string;
  href?: string;
  text: string;
  // hover/focus side effects, all optional since a link may trigger none, one, or both
  image?: string;
  imageDescription?: string;
  greeting?: string;
  // percentage rect on `image` to highlight with a FocusFrame, when the image has one
  focusArea?: FocusArea;
};

type LinkText<T extends string | string[] = string[]> = {
  links: ContentLink[];
  text: T;
};

export type { ContentLink, LinkText };

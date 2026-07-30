// Link shapes rendered by the text elements. Content modules build data in
// these shapes; elements never import content.

import type { FocusArea } from '../focus-frame/FocusFrame';

type PhotoLocation = {
  name: string;
  // omitted when the location itself is unknown/private
  coordinates?: { lat: number; lng: number };
  altitude?: string;
};

type PhotoHoverEffect = {
  type: 'photo';
  image: string;
  location?: PhotoLocation;
  description?: string;
  // percentage rect on `image` to highlight with a FocusFrame, when the image has one
  focusArea?: FocusArea;
};

type GreetingHoverEffect = {
  type: 'greeting';
  greeting: string;
};

type HoverEffect = PhotoHoverEffect | GreetingHoverEffect;

type ModalClickEffect = {
  type: 'modal';
  modalKey: string;
};

type MicroGraphicClickEffect = {
  type: 'micrographic';
  micrographicKey: string;
};

type ClickEffect = ModalClickEffect | MicroGraphicClickEffect;

type ContentLink = {
  key: string;
  text: string;
  href?: string;
  // shown as a tooltip instead of navigating; mutually exclusive with href
  tooltip?: string;
  // hover/focus side effects, all optional since a link may trigger none, one, or several
  hover?: HoverEffect[];
  click?: ClickEffect[];
};

type LinkText<T extends string | string[] = string[]> = {
  links: ContentLink[];
  text: T;
};

export type {
  ContentLink,
  LinkText,
  PhotoLocation,
  PhotoHoverEffect,
  GreetingHoverEffect,
  HoverEffect,
  ModalClickEffect,
  MicroGraphicClickEffect,
  ClickEffect,
};

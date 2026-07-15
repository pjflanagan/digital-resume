// Link shapes rendered by the text elements. Content modules build data in
// these shapes; elements never import content.

type ContentLink = {
  key: string;
  href?: string;
  text: string;
  // hover/focus side effects, all optional since a link may trigger none, one, or both
  image?: string;
  imageDescription?: string;
  greeting?: string;
};

type LinkText<T extends string | string[] = string[]> = {
  links: ContentLink[];
  text: T;
};

export type { ContentLink, LinkText };

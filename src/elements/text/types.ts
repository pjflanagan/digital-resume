// Link shapes rendered by the text elements. Content modules build data in
// these shapes; elements never import content.

type ContentLink = {
  key: string;
  href?: string;
  text: string;
  callbackParam?: { action: string; param: string }[];
};

type LinkText = {
  links: ContentLink[];
  text: string | string[];
};

export type { ContentLink, LinkText };

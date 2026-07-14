// Link shapes rendered by the text elements. Content modules build data in
// these shapes; elements never import content.

// languages the personal slide can render in
type Language = 'english' | 'mandarin';

// side effects a link can trigger on hover/focus
type LinkAction = { action: 'image'; param: string } | { action: 'text'; param: Language };

type ContentLink = {
  key: string;
  href?: string;
  text: string;
  callbackParam?: LinkAction[];
};

type LinkText<T extends string | string[] = string[]> = {
  links: ContentLink[];
  text: T;
};

export type { ContentLink, Language, LinkAction, LinkText };

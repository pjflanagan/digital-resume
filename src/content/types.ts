// Shared shapes for site content (see src/content/bio/*.json)

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

type Job = {
  name: string;
  location: string;
  time: string;
  position: string;
  image: string;
  links?: ContentLink[];
  description: string[];
  description_hidden?: string[];
  background: string;
  color: string;
};

type SchoolExtra = {
  name: string;
  position: string;
  description: string;
  link?: string;
};

type School = {
  name: string;
  location: string;
  class: string;
  degree?: string;
  image: string;
  links?: ContentLink[];
  description: string[];
  background: string;
  color: string;
  extra?: SchoolExtra[];
};

type Project = {
  name: string;
  type: string;
  link: string;
  description: string;
  image: string;
  tech?: string[];
};

type SkillGroup = {
  type: string;
  cols: number;
  items: { name: string; progress: number }[];
};

type ContactLink = {
  icon: string;
  href: string;
  text: string;
};

type FormPlaceholder = {
  name: string;
  email: string;
  message: string;
};

export type {
  ContentLink,
  LinkText,
  Job,
  SchoolExtra,
  School,
  Project,
  SkillGroup,
  ContactLink,
  FormPlaceholder,
};

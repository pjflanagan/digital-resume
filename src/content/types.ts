// Shared shapes for site content (see src/content/bio/*.json)

import type { ContentLink, LinkText } from 'src/elements/text/types';
import type { IconName } from 'src/elements/icon/SVGIcon';

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
  items: { name: string; progress: number }[];
};

type ContactLink = {
  icon: IconName;
  href: string;
  text: string;
};

type FormPlaceholder = {
  name: string;
  email: string;
  message: string;
};

// the whole bio page's content
type BioContent = {
  splash: {
    title: string;
    subtitle: string;
    prompts: string[];
  };
  personal: {
    titleText: LinkText<string>;
    linkText: LinkText;
  };
  experience: {
    accent: string;
    title: string;
    sections: string[];
    jobs: { featured: Job[]; other: Job[] };
    schools: { featured: School[]; other: School[]; hidden: School[] };
    skills: SkillGroup[];
    linkText: LinkText;
  };
  projects: {
    accent: string;
    title: string;
    sections: string[];
    projects: { featured: Project[]; all: Project[] };
    linkText: LinkText;
  };
  contact: {
    accent: string;
    title: string;
    text: string;
    links: ContactLink[];
    formPlaceholders: FormPlaceholder[];
  };
  footer: LinkText<string>[];
};

// the raw shapes of the JSON files in content/, before assembly into BioContent
type ContentFiles = {
  splash: BioContent['splash'];
  personal: BioContent['personal'];
  experience: Omit<BioContent['experience'], 'jobs' | 'schools' | 'skills'>;
  jobs: BioContent['experience']['jobs'];
  schools: BioContent['experience']['schools'];
  skills: { groups: BioContent['experience']['skills'] };
  projects: Omit<BioContent['projects'], 'projects'> & BioContent['projects']['projects'];
  contact: BioContent['contact'];
  footer: { items: BioContent['footer'] };
};

export type {
  ContentLink,
  ContentFiles,
  LinkText,
  Job,
  SchoolExtra,
  School,
  Project,
  SkillGroup,
  ContactLink,
  FormPlaceholder,
  BioContent,
};

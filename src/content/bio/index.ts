import SplashJson from '../../../content/0.0-splash.json';
import PersonalJson from '../../../content/1.0-personal.json';
import ExperienceJson from '../../../content/2.0-experience.json';
import JobsJson from '../../../content/2.1-jobs.json';
import SchoolsJson from '../../../content/2.2-schools.json';
import SkillsJson from '../../../content/2.3-skills.json';
import ProjectsJson from '../../../content/3.0-projects.json';
import ContactJson from '../../../content/4.0-contact.json';
import FooterJson from '../../../content/5.0-footer.json';
import EggJson from '../../../content/6.0-egg.json';

import type { BioContent, ContentFiles } from '../types';

// Build-time copy of content/, used as the initial render and as a
// fallback if the runtime fetch from GitHub fails.
function buildBio(files: ContentFiles): BioContent {
  return {
    splash: files.splash,
    personal: files.personal,
    experience: {
      ...files.experience,
      jobs: files.jobs,
      schools: files.schools,
      skills: files.skills.groups,
    },
    projects: {
      accent: files.projects.accent,
      title: files.projects.title,
      sections: files.projects.sections,
      linkText: files.projects.linkText,
      projects: {
        featured: files.projects.featured,
        all: files.projects.all,
      },
    },
    contact: files.contact,
    footer: files.footer.items,
    egg: files.egg,
  };
}

const StaticContentFiles = {
  splash: SplashJson,
  personal: PersonalJson,
  experience: ExperienceJson,
  jobs: JobsJson,
  schools: SchoolsJson,
  skills: SkillsJson,
  projects: ProjectsJson,
  contact: ContactJson,
  footer: FooterJson,
  egg: EggJson,
} as unknown as ContentFiles;

const PageBio: BioContent = buildBio(StaticContentFiles);

export default PageBio;
export { buildBio };

import BioJson from '../../../content/bio.json';
import JobsJson from '../../../content/jobs.json';
import SchoolsJson from '../../../content/schools.json';
import SkillsJson from '../../../content/skills.json';
import ProjectsJson from '../../../content/projects.json';

import type { BioContent, ContentFiles } from '../types';

// Build-time copy of content/, used as the initial render and as a
// fallback if the runtime fetch from GitHub fails.
const buildBio = (files: ContentFiles): BioContent => ({
  ...files.bio,
  experience: {
    ...files.bio.experience,
    jobs: files.jobs,
    schools: files.schools,
    skills: files.skills.groups,
  },
  projects: {
    ...files.bio.projects,
    projects: files.projects,
  },
});

const StaticContentFiles = {
  bio: BioJson,
  jobs: JobsJson,
  schools: SchoolsJson,
  skills: SkillsJson,
  projects: ProjectsJson,
} as unknown as ContentFiles;

const PageBio: BioContent = buildBio(StaticContentFiles);

export default PageBio;
export { buildBio, StaticContentFiles };

import type { ContentFiles } from './types';

// Content is fetched at runtime straight from the public repo, so content-only
// commits show up without a Netlify redeploy (see _todo/decap-cms-content.md).
const CONTENT_BASE = 'https://raw.githubusercontent.com/pjflanagan/digital-resume/main/content';

async function fetchContentFile<T>(file: string): Promise<T> {
  const res = await fetch(`${CONTENT_BASE}/${file}`, { cache: 'no-cache' });
  if (!res.ok) {
    throw new Error(`Failed to fetch content/${file}: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function fetchContentFiles(): Promise<ContentFiles> {
  const [bio, jobs, schools, skills, projects] = await Promise.all([
    fetchContentFile<ContentFiles['bio']>('bio.json'),
    fetchContentFile<ContentFiles['jobs']>('jobs.json'),
    fetchContentFile<ContentFiles['schools']>('schools.json'),
    fetchContentFile<ContentFiles['skills']>('skills.json'),
    fetchContentFile<ContentFiles['projects']>('projects.json'),
  ]);
  return { bio, jobs, schools, skills, projects };
}

export { fetchContentFiles };

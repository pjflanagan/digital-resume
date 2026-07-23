import type { ContentFiles } from './types';

// Content is fetched at runtime straight from the public repo, so content-only
// commits show up without a Netlify redeploy (see _todo/decap-cms-content.md).
// In development it's served locally instead (static/content symlinks to
// content/), so edits to content/*.json show up on refresh without a push.
const CONTENT_BASE =
  process.env.NODE_ENV === 'development'
    ? '/content'
    : 'https://raw.githubusercontent.com/pjflanagan/digital-resume/main/content';

// Images managed through Decap live in content/images/<folder> and are served
// from GitHub too, so image uploads skip the Netlify rebuild like other content.
// Content JSON stores bare filenames; CMS image widgets store full URLs.
type ContentImageFolder = 'personal' | 'experience' | 'projects' | 'micro-graphics';

function contentImage(folder: ContentImageFolder, image: string): string {
  return /^(https?:)?\//.test(image) ? image : `${CONTENT_BASE}/images/${folder}/${image}`;
}

async function fetchContentFile<T>(file: string): Promise<T> {
  const res = await fetch(`${CONTENT_BASE}/${file}`, { cache: 'no-cache' });
  if (!res.ok) {
    throw new Error(`Failed to fetch content/${file}: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function fetchContentFiles(): Promise<ContentFiles> {
  const [splash, personal, experience, jobs, schools, skills, projects, contact, footer, egg] =
    await Promise.all([
      fetchContentFile<ContentFiles['splash']>('0.0-splash.json'),
      fetchContentFile<ContentFiles['personal']>('1.0-personal.json'),
      fetchContentFile<ContentFiles['experience']>('2.0-experience.json'),
      fetchContentFile<ContentFiles['jobs']>('2.1-jobs.json'),
      fetchContentFile<ContentFiles['schools']>('2.2-schools.json'),
      fetchContentFile<ContentFiles['skills']>('4.0-skills.json'),
      fetchContentFile<ContentFiles['projects']>('3.0-projects.json'),
      fetchContentFile<ContentFiles['contact']>('5.0-contact.json'),
      fetchContentFile<ContentFiles['footer']>('6.0-footer.json'),
      fetchContentFile<ContentFiles['egg']>('0.0-egg.json'),
    ]);
  return { splash, personal, experience, jobs, schools, skills, projects, contact, footer, egg };
}

export { contentImage, fetchContentFiles };

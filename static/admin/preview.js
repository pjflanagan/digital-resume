/* global CMS, h */
// Custom Decap CMS previews: rough visual render of each content file with
// clickable links and visible images (served from this site's /img folders).

const IMG = {
  experience: '/img/bio/2-experience',
  projects: '/img/bio/3-projects',
  personal: '/img/bio/1-personal',
};

const imgSrc = (root, image) => {
  if (!image) return null;
  // Absolute URLs (e.g. CMS-uploaded media) pass through untouched
  return /^(https?:)?\//.test(image) ? image : `${root}/${image}`;
};

const css = `
  .preview { font-family: 'Helvetica Neue', Arial, sans-serif; background: #14151a; color: #eee; padding: 24px; min-height: 100vh; line-height: 1.5; }
  .preview a { color: #6ecbff; }
  .preview h1 { font-size: 28px; margin: 0 0 4px; }
  .preview h2 { font-size: 20px; margin: 32px 0 8px; border-bottom: 1px solid #333; padding-bottom: 4px; }
  .preview h3 { font-size: 16px; margin: 16px 0 4px; }
  .preview .accent { color: #f43f4e; font-style: italic; font-size: 14px; margin: 0; }
  .preview .muted { color: #888; font-size: 13px; }
  .preview .card { background: #1e2027; border-radius: 8px; padding: 16px; margin: 12px 0; display: flex; gap: 16px; }
  .preview .card ul { margin: 8px 0 0; padding-left: 18px; }
  .preview .card li { margin: 4px 0; }
  .preview .hidden-desc { opacity: 0.45; }
  .preview .avatar { width: 56px; height: 56px; border-radius: 50%; flex: 0 0 56px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .preview .avatar img { width: 100%; height: 100%; object-fit: contain; }
  .preview .project-img { width: 160px; height: 100px; object-fit: cover; border-radius: 6px; flex: 0 0 160px; background: #000; }
  .preview .tag { display: inline-block; background: #2c2f3a; border-radius: 4px; padding: 1px 8px; margin: 2px 4px 2px 0; font-size: 12px; }
  .preview .bar-row { display: flex; align-items: center; gap: 12px; margin: 6px 0; }
  .preview .bar-row .name { width: 140px; font-size: 14px; }
  .preview .bar { flex: 1; height: 8px; background: #2c2f3a; border-radius: 4px; overflow: hidden; }
  .preview .bar > div { height: 100%; background: #f43f4e; }
  .preview .hover-note { border-bottom: 1px dashed #6ecbff; cursor: help; color: #6ecbff; }
  .preview .pill { display: inline-block; border: 1px solid #444; border-radius: 999px; padding: 2px 10px; margin: 2px 6px 2px 0; font-size: 13px; }
`;

CMS.registerPreviewStyle(css, { raw: true });

const get = (entry, path, fallback) => {
  const value = entry.getIn(['data'].concat(path));
  if (value === undefined || value === null) return fallback;
  return value.toJS ? value.toJS() : value;
};

// Renders LinkText: substitutes <key> tokens with real anchors; keyed links
// without an href (hover actions only) render as dashed spans with a tooltip.
const linkText = (text, links) => {
  const parts = String(text || '').split(/(<[a-z_]+>)/g);
  return parts.map((part, i) => {
    const match = part.match(/^<([a-z_]+)>$/);
    if (!match) return part;
    const link = (links || []).find((l) => l.key === match[1]);
    if (!link) return h('span', { key: i, style: { color: '#f43f4e' } }, part);
    if (link.href) {
      return h('a', { key: i, href: link.href, target: '_blank', rel: 'noreferrer' }, link.text);
    }
    const actions = (link.callbackParam || []).map((c) => `${c.action}: ${c.param}`).join(', ');
    return h('span', { key: i, className: 'hover-note', title: actions || 'no action' }, link.text);
  });
};

const paragraphs = (lt) =>
  (Array.isArray(lt.text) ? lt.text : [lt.text]).map((t, i) =>
    h('p', { key: i }, linkText(t, lt.links))
  );

const plainLinks = (links) =>
  h(
    'p',
    {},
    (links || []).map((l, i) =>
      h('a', { key: i, className: 'pill', href: l.href, target: '_blank', rel: 'noreferrer' }, l.text)
    )
  );

// Shared header block: accent line + big title + section headings + intro text
const sectionIntro = (data) => [
  h('p', { key: 'accent', className: 'accent' }, data.accent),
  h('h1', { key: 'title' }, data.title),
  h('p', { key: 'sections', className: 'muted' }, (data.sections || []).join(' · ')),
  data.linkText && h('div', { key: 'intro' }, paragraphs(data.linkText)),
];

// --- Page copy files ---

const SplashPreview = ({ entry }) =>
  h(
    'div',
    { className: 'preview' },
    h('h1', {}, get(entry, ['title'], '')),
    h('p', { className: 'accent' }, get(entry, ['subtitle'], '')),
    h('p', { className: 'muted' }, get(entry, ['prompts'], []).join(' · '))
  );

const PersonalPreview = ({ entry }) => {
  const accent = get(entry, ['accent'], {});
  const titleText = get(entry, ['titleText'], null);
  const bodyText = get(entry, ['linkText'], null);
  return h(
    'div',
    { className: 'preview' },
    h('p', { className: 'accent' }, `${accent.english} / ${accent.mandarin}`),
    titleText && h('h1', {}, linkText(titleText.text, titleText.links)),
    bodyText && paragraphs(bodyText)
  );
};

const ExperiencePreview = ({ entry }) =>
  h('div', { className: 'preview' }, sectionIntro(get(entry, [], {})));

const ContactPreview = ({ entry }) => {
  const contact = get(entry, [], {});
  return h(
    'div',
    { className: 'preview' },
    h('p', { className: 'accent' }, contact.accent),
    h('h1', {}, contact.title),
    h('p', {}, contact.text),
    plainLinks(contact.links),
    h(
      'div',
      {},
      (contact.formPlaceholders || []).map((f, i) =>
        h('p', { key: i, className: 'muted' }, `${f.name} <${f.email}>: “${f.message}”`)
      )
    )
  );
};

const FooterPreview = ({ entry }) =>
  h(
    'div',
    { className: 'preview' },
    get(entry, ['items'], []).map((f, i) => h('p', { key: i }, linkText(f.text, f.links)))
  );

// --- Jobs & Schools ---

const orgCard = (org, i, subtitle) =>
  h(
    'div',
    { key: i, className: 'card', style: { borderLeft: `4px solid ${org.background || '#333'}` } },
    h(
      'div',
      { className: 'avatar', style: { background: org.background || '#333' } },
      org.image && h('img', { src: imgSrc(IMG.experience, org.image), alt: org.name })
    ),
    h(
      'div',
      { style: { flex: 1 } },
      h('h3', { style: { margin: 0 } }, org.name),
      h('p', { className: 'muted', style: { margin: 0 } }, subtitle),
      h('ul', {}, (org.description || []).map((d, j) => h('li', { key: j }, d))),
      org.description_hidden &&
        h(
          'ul',
          { className: 'hidden-desc' },
          org.description_hidden.map((d, j) => h('li', { key: j }, `${d} (show more)`))
        ),
      org.extra &&
        org.extra.map((e, j) =>
          h(
            'p',
            { key: j, className: 'muted' },
            `${e.name} — ${e.position}: ${e.description} `,
            e.link && h('a', { href: e.link, target: '_blank', rel: 'noreferrer' }, 'link')
          )
        ),
      org.links && plainLinks(org.links)
    )
  );

const JobsPreview = ({ entry }) =>
  h(
    'div',
    { className: 'preview' },
    ['featured', 'other'].map((section) =>
      h(
        'div',
        { key: section },
        h('h2', {}, section === 'featured' ? 'Featured Jobs' : 'Other Jobs'),
        get(entry, [section], []).map((job, i) =>
          orgCard(job, i, `${job.position} · ${job.location} · ${job.time}`)
        )
      )
    )
  );

const SchoolsPreview = ({ entry }) =>
  h(
    'div',
    { className: 'preview' },
    ['featured', 'other', 'hidden'].map((section) =>
      h(
        'div',
        { key: section },
        h('h2', {}, `${section[0].toUpperCase()}${section.slice(1)} Schools`),
        get(entry, [section], []).map((school, i) =>
          orgCard(
            school,
            i,
            [school.degree, school.class, school.location].filter(Boolean).join(' · ')
          )
        )
      )
    )
  );

// --- Skills ---

const SkillsPreview = ({ entry }) =>
  h(
    'div',
    { className: 'preview' },
    get(entry, ['groups'], []).map((group, i) =>
      h(
        'div',
        { key: i },
        h('h2', {}, `${group.type} (${group.cols} col${group.cols === 1 ? '' : 's'})`),
        (group.items || []).map((item, j) =>
          h(
            'div',
            { key: j, className: 'bar-row' },
            h('span', { className: 'name' }, item.name),
            h('div', { className: 'bar' }, h('div', { style: { width: `${item.progress}%` } })),
            h('span', { className: 'muted' }, `${item.progress}%`)
          )
        )
      )
    )
  );

// --- Projects ---

const ProjectsPreview = ({ entry }) =>
  h(
    'div',
    { className: 'preview' },
    sectionIntro(get(entry, [], {})),
    [
      ['featured', 'Featured Projects'],
      ['all', 'Other Projects'],
    ].map(([section, label]) =>
      h(
        'div',
        { key: section },
        h('h2', {}, label),
        get(entry, [section], []).map((project, i) =>
          h(
            'div',
            { key: i, className: 'card' },
            h('img', {
              className: 'project-img',
              src: imgSrc(IMG.projects, project.image),
              alt: project.name,
            }),
            h(
              'div',
              { style: { flex: 1 } },
              h(
                'h3',
                { style: { margin: 0 } },
                h('a', { href: project.link, target: '_blank', rel: 'noreferrer' }, project.name)
              ),
              h('p', { className: 'muted', style: { margin: 0 } }, project.type),
              h('p', {}, project.description),
              (project.tech || []).map((t, j) => h('span', { key: j, className: 'tag' }, t))
            )
          )
        )
      )
    )
  );

CMS.registerPreviewTemplate('splash', SplashPreview);
CMS.registerPreviewTemplate('personal', PersonalPreview);
CMS.registerPreviewTemplate('experience', ExperiencePreview);
CMS.registerPreviewTemplate('contact', ContactPreview);
CMS.registerPreviewTemplate('footer', FooterPreview);
CMS.registerPreviewTemplate('jobs', JobsPreview);
CMS.registerPreviewTemplate('schools', SchoolsPreview);
CMS.registerPreviewTemplate('skills', SkillsPreview);
CMS.registerPreviewTemplate('projects', ProjectsPreview);

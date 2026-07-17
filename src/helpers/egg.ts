import Egg from 'src/content/egg';
import type { EggReference } from 'src/content/egg';

// console easter egg: window.Egg lets visitors "check off" the sci-fi
// references hidden around the site and reveals where each one lives

const STORAGE_KEY = 'sci-fi-found';

function getFound(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveFound(found: Set<string>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...found]));
  } catch {
    // ignore storage errors (e.g. private browsing)
  }
}

function checkboxLine(reference: EggReference, found: Set<string>): string {
  const box = found.has(reference.id) ? '☑' : '☐';
  return `${box} ${reference.name}`;
}

function list(): void {
  const found = getFound();
  console.log(Egg.references.map((reference) => checkboxLine(reference, found)).join('\n'));
  console.log(
    `\nFound ${found.size} / ${Egg.references.length}. Call Egg.check('name') to check one off.`
  );
}

function findReference(query: string): EggReference | undefined {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, '-');
  return Egg.references.find(
    (reference) =>
      reference.id === normalized || reference.name.toLowerCase() === query.trim().toLowerCase()
  );
}

function check(query: string): void {
  const reference = findReference(query);
  if (!reference) {
    console.log(`Not sure what "${query}" is. Try Egg.list() to see the names.`);
    return;
  }
  const found = getFound();
  found.add(reference.id);
  saveFound(found);
  console.log(`☑ ${reference.name}\n${reference.answer}`);
  list();
}

function reset(): void {
  saveFound(new Set());
  console.log('Cleared. Call Egg.list() to start again.');
}

function initEgg(): void {
  window.Egg = { list, check, reset };
  console.log(Egg.intro);
}

export { initEgg };

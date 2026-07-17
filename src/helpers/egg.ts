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

function checkboxLine(reference: EggReference, index: number, found: Set<string>): string {
  const box = found.has(reference.id) ? '☑' : '☐';
  return `${box} ${index + 1}. ${reference.name}`;
}

function list(): void {
  const found = getFound();
  console.log(
    Egg.references.map((reference, index) => checkboxLine(reference, index, found)).join('\n')
  );
}

function findReference(query: string | number): EggReference | undefined {
  if (typeof query === 'number') {
    return Egg.references[query - 1];
  }
  const normalized = query.trim().toLowerCase().replace(/\s+/g, '-');
  return Egg.references.find(
    (reference) =>
      reference.id === normalized || reference.name.toLowerCase() === query.trim().toLowerCase()
  );
}

function check(query: string | number): void {
  const reference = findReference(query);
  if (!reference) {
    console.log(
      `There's only ${Egg.references.length} easter eggs. Try a number between 1 and ${Egg.references.length}. Use Egg.list() to see all references.`
    );
    return;
  }
  const found = getFound();
  found.add(reference.id);
  saveFound(found);
  console.log(`☑ ${reference.name}\n${reference.answer}`);
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

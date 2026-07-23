#!/usr/bin/env node
// Cross-checks `Style.foo` usages in .tsx files against the classes actually defined in the
// co-located `*.module.scss` file, in both directions:
//   - undefined:  Style.foo referenced in the component but no `.foo`/`.foo-bar` class in the scss
//   - unused:     a class defined in the scss but never referenced from the component
//
// Written for this codebase's `import * as Style from './X.module.scss'` convention -
// eslint-plugin-css-modules only supports default imports, so it silently finds nothing here.

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function kebabToCamel(str) {
  return str.replace(/-+(\w)/g, (_, c) => c.toUpperCase());
}

// extracts class selectors (`.foo`, `&.foo`) from the text that immediately precedes each `{`,
// so we never pick up class-like substrings from property values (url(), gradients, etc.) or
// from commented-out rules
function extractScssClasses(scssContent) {
  const withoutComments = scssContent
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');

  const classes = new Set();
  let sinceLastDelimiter = '';
  for (const char of withoutComments) {
    if (char === '{') {
      // selector text is whatever follows the last property's `;` in this block - property
      // values (e.g. a data-uri in `cursor: url(...)`) never contain a `{`, so this keeps us
      // from misreading fragments like ".w3.org" inside a url() as class selectors
      const selectorText = sinceLastDelimiter.slice(sinceLastDelimiter.lastIndexOf(';') + 1);
      for (const m of selectorText.matchAll(/\.([a-zA-Z_][\w-]*)/g)) {
        classes.add(m[1]);
      }
      sinceLastDelimiter = '';
    } else if (char === '}') {
      sinceLastDelimiter = '';
    } else {
      sinceLastDelimiter += char;
    }
  }
  return classes;
}

// extracts `Style.foo` / `Style['foo-bar']` / `Style["foo-bar"]` usages, for whichever
// local name the module namespace was imported as. Also reports whether the file indexes
// Style with a variable (`Style[color]`) - those keys are opaque to static analysis, so any
// file doing this makes "unused class" unprovable for its whole scss module
function extractStyleUsages(tsxContent, styleImportName) {
  const usages = new Set();
  const dotRe = new RegExp(`\\b${styleImportName}\\.([a-zA-Z_$][\\w$]*)`, 'g');
  for (const m of tsxContent.matchAll(dotRe)) usages.add(m[1]);
  const bracketRe = new RegExp(`\\b${styleImportName}\\[['"]([\\w-]+)['"]\\]`, 'g');
  for (const m of tsxContent.matchAll(bracketRe)) usages.add(m[1]);
  const dynamicBracketRe = new RegExp(`\\b${styleImportName}\\[(?!['"])[^\\]]+\\]`, 'g');
  const hasDynamicAccess = dynamicBracketRe.test(tsxContent);
  return { usages, hasDynamicAccess };
}

function main() {
  const tsxFiles = walk(SRC_DIR).filter((f) => f.endsWith('.tsx'));
  let problems = 0;

  // a single .module.scss can be imported by several .tsx files (e.g. a shared Text.module.scss),
  // so "unused" has to be judged across all of them combined, not file by file
  const usagesByScssFile = new Map(); // scssFile -> Set(usages), aggregated across all importers
  const importersByScssFile = new Map(); // scssFile -> Set(tsxFile)
  const definedByScssFile = new Map(); // scssFile -> Set(kebab class names)
  const dynamicByScssFile = new Map(); // scssFile -> importer that indexes Style[var]

  for (const tsxFile of tsxFiles) {
    const tsxContent = fs.readFileSync(tsxFile, 'utf8');
    const importRe = /import \* as (\w+) from '(\.[^']+\.module\.scss)'/g;
    for (const importMatch of tsxContent.matchAll(importRe)) {
      const [, styleImportName, importPath] = importMatch;
      const scssFile = path.resolve(path.dirname(tsxFile), importPath);
      if (!fs.existsSync(scssFile)) continue;

      const scssContent = fs.readFileSync(scssFile, 'utf8');
      const definedKebab = extractScssClasses(scssContent);
      const definedCamel = new Set([...definedKebab].map(kebabToCamel));
      const { usages, hasDynamicAccess } = extractStyleUsages(tsxContent, styleImportName);

      const relTsx = path.relative(process.cwd(), tsxFile);
      const relScss = path.relative(process.cwd(), scssFile);

      for (const used of usages) {
        if (!definedCamel.has(used) && !definedKebab.has(used)) {
          console.log(`✗ undefined class: ${relTsx} uses ${styleImportName}.${used}, not found in ${relScss}`);
          problems += 1;
        }
      }

      if (!usagesByScssFile.has(scssFile)) usagesByScssFile.set(scssFile, new Set());
      if (!importersByScssFile.has(scssFile)) importersByScssFile.set(scssFile, new Set());
      for (const used of usages) usagesByScssFile.get(scssFile).add(used);
      importersByScssFile.get(scssFile).add(relTsx);
      definedByScssFile.set(scssFile, definedKebab);
      if (hasDynamicAccess) dynamicByScssFile.set(scssFile, relTsx);
    }
  }

  for (const [scssFile, usages] of usagesByScssFile) {
    if (dynamicByScssFile.has(scssFile)) continue; // can't prove unused past a Style[var] access
    const relScss = path.relative(process.cwd(), scssFile);
    const importers = [...importersByScssFile.get(scssFile)].join(', ');
    for (const defined of definedByScssFile.get(scssFile)) {
      const camel = kebabToCamel(defined);
      if (!usages.has(defined) && !usages.has(camel)) {
        console.log(`✗ unused class: .${defined} defined in ${relScss}, never referenced from ${importers}`);
        problems += 1;
      }
    }
  }

  if (problems === 0) {
    console.log('css modules audit: clean');
  } else {
    console.log(`\ncss modules audit: ${problems} problem(s)`);
    process.exitCode = 1;
  }
}

main();

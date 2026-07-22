import { useState, useEffect, type CSSProperties } from 'react';

import { Random } from 'src/helpers/random';

import type { BlueprintName } from './Blueprint';

const BLUEPRINT_POOL: BlueprintName[] = [
  'tree-of-life',
  'golden-record'
  // 'arc-reactor',
  // 'dummy-plug',
  // 'bender',
];

// Inset (in %) kept clear at the top/bottom of the slide and between bands,
// so blueprints never bleed past the edges or overlap each other.
const BAND_MARGIN = 4;

interface ActiveBlueprint {
  name: BlueprintName;
  style: CSSProperties;
}

function generateBlueprintStyle(bandStart: number, bandEnd: number, side: 'left' | 'right'): CSSProperties {
  const size = Random.int(500, 700);
  const vOffset = Random.int(bandStart + BAND_MARGIN, bandEnd - BAND_MARGIN);
  const hOffset = -Random.int(150, 300);

  return {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    top: `${vOffset}%`,
    [side]: `${hOffset}px`,
  };
}

// Every blueprint in the pool gets shown, spread into evenly sized vertical
// bands (top to bottom) so however many there are, they never overlap. The
// first band picks a random side, then each band down alternates sides.
function generateBlueprints(): ActiveBlueprint[] {
  const names = Random.shuffle(BLUEPRINT_POOL);
  const bandHeight = 100 / names.length;
  const firstSide: 'left' | 'right' = Random.bool() ? 'left' : 'right';
  return names.map((name, index) => {
    const side = index % 2 === 0 ? firstSide : firstSide === 'left' ? 'right' : 'left';
    return {
      name,
      style: generateBlueprintStyle(index * bandHeight, (index + 1) * bandHeight, side),
    };
  });
}

function useBlueprints(): [ActiveBlueprint[], () => void] {
  const [activeBlueprints, setActiveBlueprints] = useState<ActiveBlueprint[]>([]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setActiveBlueprints(generateBlueprints());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const randomizeBlueprints = () => {
    setActiveBlueprints(generateBlueprints());
  };

  return [activeBlueprints, randomizeBlueprints];
}

export { useBlueprints };
export type { ActiveBlueprint };

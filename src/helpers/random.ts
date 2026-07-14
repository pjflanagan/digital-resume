// RANDOM --------------------------------------------------------------------------------------------

type Range = { min: number; max: number };

const Random = {
  int: (min: number, max: number): number => Math.round(Math.random() * (max - min)) + min,
  dec: (min: number, max: number): number => Math.random() * (max - min) + min,
  bool: (): boolean => Math.random() > 0.5,
  intProp: ({ min, max }: Range): number => Random.int(min, max),
  decProp: ({ min, max }: Range): number => Random.dec(min, max),
  // a random decimal in the range, scaled by comp (e.g. proportions of a dimension)
  scaledProp: (range: Range, comp: number): number => Random.decProp(range) * comp,
  shuffle: <T>(array: readonly T[]): T[] => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  },
  fromArray: <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)],
  insertRandom: <T>(array: T[], value: T): void => {
    array.splice(Random.int(0, array.length), 0, value);
  },
};

export { Random };
export type { Range };

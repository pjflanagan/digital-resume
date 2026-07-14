// RANDOM --------------------------------------------------------------------------------------------

type Range = { min: number; max: number };

const Random = {
  int: (min: number, max: number): number => Math.round(Math.random() * (max - min)) + min,
  dec: (min: number, max: number): number => Math.random() * (max - min) + min,
  bool: (): boolean => Math.random() > 0.5,
  prop: ({ min, max }: Range): number => {
    if (min % 1 === 0 && max % 1 === 0) {
      return Random.int(min, max);
    }
    return Random.dec(min, max);
  },
  prop2: ({ min, max }: Range, comp: number): number => Random.prop({ min, max }) * comp,
  shuffle: <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
  insertRandom: <T>(array: T[], value: T): void => {
    array.splice(Random.int(0, array.length), 0, value);
  },
};

export { Random };
export type { Range };

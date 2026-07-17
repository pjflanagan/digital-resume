declare module '*.scss';
declare module '*.png';

type EggApi = {
  list: () => void;
  check: (query: string | number) => void;
  reset: () => void;
};

interface Window {
  Egg: EggApi;
}

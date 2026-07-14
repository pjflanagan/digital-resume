export * from './color';
export * from './math';
export * from './random';

const encode = (data: Record<string, string>): string => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export { encode };

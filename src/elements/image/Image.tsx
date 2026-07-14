import clsx from 'clsx';

import * as Style from './Image.module.scss';

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

// Generic replacement for GatsbyImage: a wrapper div (so existing styles
// that target `.someClass img` keep working) with a cover-fit img inside.
const Image = ({ src, alt, className }: ImageProps) => (
  <div className={clsx(Style.imageHolder, className)}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

export { Image };

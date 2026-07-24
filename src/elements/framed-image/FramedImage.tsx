import type { ReactNode } from 'react';

import { FrameHolder, Image } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';
import { FocusFrame } from 'src/elements/focus-frame/FocusFrame';

type FramedImageProps = {
  src: string;
  alt: string;
  // overlay: frame sits over the image as a sibling decoration (frame bounds are independent of image bounds)
  // inset: image nests inside the frame, so the frame's corner brackets can peek out around it
  layout?: 'overlay' | 'inset';
  // frame/image sizing differs per page (offsets, hover states, keyframe
  // reveals); composition seam like ButtonHolder's className, not a bounded
  // set of variants
  frameClassName?: string;
  imageClassName?: string;
  // percentage rect to highlight on the image with an animated FocusFrame
  focusArea?: FocusArea;
};

function FramedImage({
  src,
  alt,
  layout = 'overlay',
  frameClassName,
  imageClassName,
  focusArea,
}: FramedImageProps): ReactNode {
  const plainImage = <Image src={src} alt={alt} className={imageClassName} />;
  const image = focusArea ? <FocusFrame area={focusArea}>{plainImage}</FocusFrame> : plainImage;

  // a focusArea supplies its own FrameHolder, so skip the decorative one to avoid doubling up
  if (focusArea) {
    return image;
  }

  if (layout === 'inset') {
    return <FrameHolder className={frameClassName}>{image}</FrameHolder>;
  }

  return (
    <>
      {image}
      <FrameHolder className={frameClassName} />
    </>
  );
}

export { FramedImage };

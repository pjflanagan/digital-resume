import { FrameHolder, Image } from 'src/elements';

type FramedImageProps = {
  src: string;
  alt: string;
  // overlay: frame sits over the image as a sibling decoration (frame bounds are independent of image bounds)
  // inset: image nests inside the frame, so the frame's corner brackets can peek out around it
  layout?: 'overlay' | 'inset';
  frameClassName?: string;
  imageClassName?: string;
};

const FramedImage = ({ src, alt, layout = 'overlay', frameClassName, imageClassName }: FramedImageProps) => {
  const image = <Image src={src} alt={alt} className={imageClassName} />;

  if (layout === 'inset') {
    return <FrameHolder className={frameClassName}>{image}</FrameHolder>;
  }

  return (
    <>
      {image}
      <FrameHolder className={frameClassName} />
    </>
  );
};

export { FramedImage };

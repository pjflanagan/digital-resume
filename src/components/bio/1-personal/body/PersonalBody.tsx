import { useState } from 'react';
import clsx from 'clsx';

import { TextAccent, TextTitle, Text, ParseTextForLinks } from 'src/elements';
import { useBio } from 'src/content';
import type { LinkCallback } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';
import type { PhotoLocation } from 'src/elements/text/types';

import { EggModal } from '../egg-modal/EggModal';

import * as Style from './PersonalBody.module.scss';

type BodyProps = {
  photoLinkCallback: (
    photo: string,
    photoDescription?: string,
    photoLocation?: PhotoLocation,
    focusArea?: FocusArea
  ) => void;
  microGraphicCycleCallback: () => void;
};

function PersonalBody({ photoLinkCallback, microGraphicCycleCallback }: BodyProps) {
  const { linkText, titleText } = useBio().personal;
  const [greeting, setGreeting] = useState(titleText.links[0].greeting ?? '');
  const [isEggModalOpen, setIsEggModalOpen] = useState(false);
  const paragraphs = linkText.text.split('\n');

  const linkHover: LinkCallback = ({
    image,
    photoLocation,
    photoDescription,
    greeting: linkGreeting,
    focusArea,
  }) => {
    if (image) photoLinkCallback(image, photoDescription, photoLocation, focusArea);
    if (linkGreeting) setGreeting(linkGreeting);
  };

  function linkClick(key: string): void {
    if (key === 'sci_fi') setIsEggModalOpen(true);
    if (key === 'sci_fi_cycle') microGraphicCycleCallback();
  }

  return (
    <div className={Style.body}>
      <TextAccent mono animate>
        {greeting}
      </TextAccent>
      <TextTitle>{ParseTextForLinks(titleText.text, titleText.links, linkHover)}</TextTitle>
      {paragraphs.map((paragraph, i) => (
        <div
          key={i}
          className={clsx(i === 1 && Style.paragraphTablet, i >= 2 && Style.paragraphDesktop)}
        >
          <Text links={linkText.links} callback={linkHover} onLinkClick={linkClick}>
            {paragraph}
          </Text>
        </div>
      ))}
      <EggModal isOpen={isEggModalOpen} onClose={() => setIsEggModalOpen(false)} />
    </div>
  );
}

export { PersonalBody };

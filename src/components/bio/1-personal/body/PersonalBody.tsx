import { useState } from 'react';

import { TextAccent, TextTitle, Text, ParseTextForLinks } from 'src/elements';
import { useBio } from 'src/content';
import type { LinkCallback } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';

import { EggModal } from '../egg-modal/EggModal';

import * as Style from './PersonalBody.module.scss';

type BodyProps = {
  photoLinkCallback: (photo: string, photoDescription?: string, focusArea?: FocusArea) => void;
  microGraphicCycleCallback: () => void;
};

function PersonalBody({ photoLinkCallback, microGraphicCycleCallback }: BodyProps) {
  const { linkText, titleText } = useBio().personal;
  const [greeting, setGreeting] = useState(titleText.links[0].greeting ?? '');
  const [isEggModalOpen, setIsEggModalOpen] = useState(false);
  const paragraphs = linkText.text.split('\n');

  const linkHover: LinkCallback = ({
    image,
    imageDescription,
    greeting: linkGreeting,
    focusArea,
  }) => {
    if (image) photoLinkCallback(image, imageDescription, focusArea);
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
      <Text links={linkText.links} callback={linkHover}>
        {paragraphs[0]}
      </Text>
      {paragraphs.slice(1).map((paragraph) => (
        <Text
          key={paragraph}
          className={Style.bioAdditional}
          links={linkText.links}
          callback={linkHover}
          onLinkClick={linkClick}
        >
          {paragraph}
        </Text>
      ))}
      <EggModal isOpen={isEggModalOpen} onClose={() => setIsEggModalOpen(false)} />
    </div>
  );
}

export { PersonalBody };

import { useState } from 'react';
import clsx from 'clsx';

import { TextAccent, TextTitle, TextInlineLink, Text, splitWords } from 'src/elements';
import { useBio } from 'src/content';
import type { LinkCallback, LinkClickCallback } from 'src/elements';
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
  const [nameLink] = titleText.links;
  const nameGreeting = nameLink.hover?.find((effect) => effect.type === 'greeting')?.greeting;
  const [greeting, setGreeting] = useState(nameGreeting ?? '');
  const [isEggModalOpen, setIsEggModalOpen] = useState(false);
  const paragraphs = linkText.text.split('\n');

  const linkHover: LinkCallback = (effects) => {
    effects.forEach((effect) => {
      if (effect.type === 'photo') {
        photoLinkCallback(effect.image, effect.description, effect.location, effect.focusArea);
      }
      if (effect.type === 'greeting') setGreeting(effect.greeting);
    });
  };

  const linkClick: LinkClickCallback = (effects) => {
    effects.forEach((effect) => {
      if (effect.type === 'modal' && effect.modalKey === 'egg') setIsEggModalOpen(true);
      if (effect.type === 'micrographic') microGraphicCycleCallback();
    });
  };

  return (
    <div className={Style.body}>
      <TextAccent mono animate>
        {greeting}
      </TextAccent>
      <TextTitle>
        {/* the name is always exactly one link with no surrounding text, so it's rendered
            directly (rather than through the generic ParseTextForLinks) to split it into
            words via splitWords: on small screens only the first word ("Peter") shows */}
        <TextInlineLink
          onMouseOver={() => linkHover(nameLink.hover ?? [])}
          onFocus={() => linkHover(nameLink.hover ?? [])}
        >
          {splitWords(nameLink.text)}
        </TextInlineLink>
      </TextTitle>
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

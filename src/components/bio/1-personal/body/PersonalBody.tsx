import { useState } from 'react';

import { TextAccent, TextTitle, Text, ParseTextForLinks } from 'src/elements';
import { useBio } from 'src/content';
import type { LinkCallback } from 'src/elements';
import type { FocusArea } from 'src/elements/focus-frame/FocusFrame';

import * as Style from './PersonalBody.module.scss';

type BodyProps = {
  photoLinkCallback: (photo: string, photoDescription?: string, focusArea?: FocusArea) => void;
};

const PersonalBody = ({ photoLinkCallback }: BodyProps) => {
  const { linkText, titleText } = useBio().personal;
  const [greeting, setGreeting] = useState(titleText.links[0].greeting ?? '');

  const linkHover: LinkCallback = ({ image, imageDescription, greeting: linkGreeting, focusArea }) => {
    if (image) photoLinkCallback(image, imageDescription, focusArea);
    if (linkGreeting) setGreeting(linkGreeting);
  };

  return (
    <div className={Style.body}>
      <TextAccent mono animate>
        {greeting}
      </TextAccent>
      <TextTitle>{ParseTextForLinks(titleText.text, titleText.links, linkHover)}</TextTitle>
      <Text links={linkText.links}>{linkText.text[0]}</Text>
      <Text className={Style.bioAdditional} links={linkText.links} callback={linkHover}>
        {linkText.text[1]}
      </Text>
    </div>
  );
};

export { PersonalBody };

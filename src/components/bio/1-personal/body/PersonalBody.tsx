import { useState } from 'react';

import { TextAccent, TextTitle, Text, ParseTextForLinks } from 'src/elements';
import { useBio } from 'src/content';
import type { LinkCallback } from 'src/elements';

import * as Style from './PersonalBody.module.scss';

type BodyProps = {
  photoLinkCallback: (photo: string, photoDescription?: string) => void;
};

const PersonalBody = ({ photoLinkCallback }: BodyProps) => {
  const { accent, linkText, titleText } = useBio().personal;
  const [greeting, setGreeting] = useState(accent);

  const linkHover: LinkCallback = ({ image, imageDescription, greeting: linkGreeting }) => {
    if (image) photoLinkCallback(image, imageDescription);
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

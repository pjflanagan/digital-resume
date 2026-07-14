import { useState } from 'react';

import { TextAccent, TextTitle, Text, ParseTextForLinks } from 'src/elements';
import { Bio } from 'src/content';
import type { Language, LinkAction } from 'src/content';

import * as Style from './PersonalBody.module.scss';

type BodyProps = {
  photoLinkCallback: (photo: string) => void;
};

const PersonalBody = ({ photoLinkCallback }: BodyProps) => {
  const [language, setLanguage] = useState<Language>('english');

  const linkHover = (actions?: LinkAction[]) => {
    actions?.forEach(({ action, param }) => {
      switch (action) {
        case 'image':
          photoLinkCallback(param);
          break;
        case 'text':
          setLanguage(param);
          break;
      }
    });
  };

  const { accent, linkText, titleText } = Bio.personal;
  return (
    <div className={Style.body}>
      <TextAccent mono animate>
        {accent[language]}
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

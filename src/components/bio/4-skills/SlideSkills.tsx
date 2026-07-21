import { TextTitle, TextAccent, ScrollElement } from 'src/elements';
import { useBio } from 'src/content';

import { Skills } from './Skills';
import * as Style from './SlideSkills.module.scss';

export function SlideSkills() {
  const { accent, title } = useBio().experience.skills;
  return (
    <ScrollElement className={Style.slideSkills} name="skills">
      <div className={Style.slideBody}>
        <div className={Style.titleHolder}>
          <TextAccent mono animate>
            {accent}
          </TextAccent>
          <TextTitle>{title}</TextTitle>
        </div>
        <Skills />
      </div>
    </ScrollElement>
  );
}

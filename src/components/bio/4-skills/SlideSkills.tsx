import { TextTitle, TextAccent, ScrollElement } from 'src/elements';
import { useBio } from 'src/content';

import { Skills } from './Skills';
import * as Style from './SlideSkills.module.scss';

function SlideSkills() {
  const { accent, title } = useBio().experience.skills;
  return (
    <ScrollElement className={Style.slideSkills} name="skills">
      <div className={Style.slideBody}>
        <TextAccent mono animate>
          {accent}
        </TextAccent>
        <TextTitle>{title}</TextTitle>
        <Skills />
      </div>
    </ScrollElement>
  );
}

export { SlideSkills };

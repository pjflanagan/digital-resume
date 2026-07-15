import type { CSSProperties } from 'react';

import { ProgressBar, TextHeading } from 'src/elements';
import { useBio } from 'src/content';

import * as Style from './Skills.module.scss';

const Skills = () => (
  <div className={Style.skills}>
    {useBio().experience.skills.map(({ type, items, cols }) => (
      <div key={type} className={Style.skillGroup}>
        <TextHeading>{type}</TextHeading>
        <div className={Style.skillListHolder}>
          {items.map((skill, i) => (
            <div key={i} className={Style.skillBarHolder} style={{ '--cols': cols } as CSSProperties}>
              <ProgressBar key={skill.name} name={skill.name} progress={skill.progress} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export { Skills };

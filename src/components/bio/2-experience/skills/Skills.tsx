import type { CSSProperties } from 'react';
import { useState } from 'react';
import clsx from 'clsx';

import { LabeledButton, ProgressBar, TextHeading } from 'src/elements';
import { useBio } from 'src/content';

import * as Style from './Skills.module.scss';

const COLLAPSED_COUNT = 2;
const HIDDEN_GROUP = 'Other';
const REVEAL_STEP_MS = 60;

const Skills = () => {
  const [showAll, setShowAll] = useState(false);

  const groups = useBio().experience.skills.filter(({ type }) => showAll || type !== HIDDEN_GROUP);

  return (
    <div className={Style.skills}>
      {groups.map(({ type, items }) => (
        <div key={type} className={Style.skillGroup}>
          <TextHeading>{type}</TextHeading>
          <div className={Style.skillListHolder}>
            {(showAll ? items : items.slice(0, COLLAPSED_COUNT)).map((skill, i) => {
              const isRevealed = i >= COLLAPSED_COUNT || type === HIDDEN_GROUP;
              const style = isRevealed
                ? ({ '--delay': `${i * REVEAL_STEP_MS}ms` } as CSSProperties)
                : undefined;

              return (
                <div
                  key={i}
                  className={clsx(Style.skillBarHolder, isRevealed && Style.reveal)}
                  style={style}
                >
                  <ProgressBar key={skill.name} name={skill.name} progress={skill.progress} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {!showAll && (
        <div className={Style.showAllHolder}>
          <LabeledButton icon="plus" onClick={() => setShowAll(true)}>
            {'Show more'}
          </LabeledButton>
        </div>
      )}
    </div>
  );
};

export { Skills };

import type { CSSProperties } from 'react';
import { useState } from 'react';
import clsx from 'clsx';

import { LabeledButton, ProgressBar, TextHeading } from 'src/elements';
import { useBio } from 'src/content';

import * as Style from './Skills.module.scss';

const COLLAPSED_COUNT = 2;
const HIDDEN_GROUP = 'Other';
const REVEAL_STEP_MS = 60;

type SkillGroup = { type: string; items: { name: string; progress: number }[] };

function visibleLength(group: SkillGroup, showAll: boolean) {
  return showAll ? group.items.length : Math.min(group.items.length, COLLAPSED_COUNT);
}

function splitIntoColumns(groups: SkillGroup[], showAll: boolean): SkillGroup[][] {
  const columns: SkillGroup[][] = [[], []];
  const columnLengths = [0, 0];

  groups.forEach((group) => {
    const shortestColumn = columnLengths[0] <= columnLengths[1] ? 0 : 1;
    columns[shortestColumn].push(group);
    columnLengths[shortestColumn] += visibleLength(group, showAll);
  });

  return columns;
}

function SkillGroupList({ type, items, showAll }: SkillGroup & { showAll: boolean }) {
  return (
    <div className={Style.skillGroup}>
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
  );
}

function Skills() {
  const [showAll, setShowAll] = useState(false);

  const groups = useBio().experience.skills.filter(({ type }) => showAll || type !== HIDDEN_GROUP);
  const columns = splitIntoColumns(groups, showAll);

  return (
    <div className={Style.skills}>
      <div className={Style.skillColumns}>
        {columns.map((column, i) => (
          <div key={i} className={Style.skillColumn}>
            {column.map((group) => (
              <SkillGroupList key={group.type} {...group} showAll={showAll} />
            ))}
          </div>
        ))}
      </div>
      {!showAll && (
        <div className={Style.showAllHolder}>
          <LabeledButton icon="plus" onClick={() => setShowAll(true)}>
            {'Show more'}
          </LabeledButton>
        </div>
      )}
    </div>
  );
}

export { Skills };

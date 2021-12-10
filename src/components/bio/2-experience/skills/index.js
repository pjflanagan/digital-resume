import React from "react";

import { ProgressBar, TextSectionHeading } from "src/elements";
import { Bio } from 'src/content';

import * as Style from "./style.module.scss";

const Skills = () => (
  <div>
    {Bio.experience.skills.map(({ type, items, cols }) => (
      <div key={type}>
        <TextSectionHeading>{type}</TextSectionHeading>
        <div className={Style.skillListHolder}>
          {items.map((skill, i) => (
            <div
              key={i}
              className={Style.skillBarHolder}
              style={{ width: `${100 / cols}%` }}
            >
              <ProgressBar
                key={skill.name}
                name={skill.name}
                progress={skill.progress}
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export { Skills };

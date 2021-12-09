import React from "react";

import { ProgressBar, TextSubHeading2 } from "src/elements";
import { Main } from 'src/content';

import * as Style from "./style.module.scss";

const Skills = () => (
  <div>
    {Main.experience.skills.map(({ type, items, cols }) => (
      <div key={type}>
        <TextSubHeading2>{type}</TextSubHeading2>
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

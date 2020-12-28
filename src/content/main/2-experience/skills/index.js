import React from "react";

import { ProgressBar, TextSubHeading2 } from "../../../../elements";
import { Skills as SkillsData } from '../../../../data';

import Style from "./style.module.scss";

const Skills = () => (
  <div>
    {SkillsData.map(({ type, items, cols }) => (
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
                gap={28}
                edge={"bottom"}
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export { Skills };

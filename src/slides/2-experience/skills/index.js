import React from "react";

import { ProgressBar, TextSubHeading2 } from "../../../elements";

import SkillsData from "./skills.json";
import Style from "./style.module.scss";

const Skills = (props) => (
  <div>
    {SkillsData.map(({ type, items, cols }) => (
      <div key={type}>
        <TextSubHeading2>{type}</TextSubHeading2>
        <div className={Style.skillListHolder}>
          {items.map((skill) => (
            <div
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

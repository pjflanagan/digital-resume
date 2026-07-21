import { TextTitle, TextAccent, Text, ScrollElement } from 'src/elements';
import { useBio } from 'src/content';

import { Jobs } from './jobs/Jobs';
import { Education } from './education/Education';
import * as Style from './SlideExperience.module.scss';

function SlideExperience() {
  const { accent, title, jobs, schools, linkText } = useBio().experience;
  return (
    <ScrollElement className={Style.slideExperience} name="experience">
      <div className={Style.preSlideCurveHolder}>
        <div className={Style.preSlideCurve} />
      </div>
      <div className={Style.slideBody}>
        <TextAccent mono animate>
          {accent}
        </TextAccent>
        <TextTitle>{title}</TextTitle>
        <Text links={linkText.links}>{linkText.text[0]}</Text>

        <Jobs title={jobs.title} featured={jobs.featured} other={jobs.other} />
        <Education title={schools.title} featured={schools.featured} other={schools.other} />
      </div>
    </ScrollElement>
  );
}

export { SlideExperience };

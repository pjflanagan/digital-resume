import { TextTitle, TextSection, TextAccent, Text, ShowMore, ScrollElement } from 'src/elements';
import { useBio } from 'src/content';
import type { Job, School } from 'src/content';

import { Org } from './org/Org';
import { Skills } from './skills/Skills';
import * as Style from './SlideExperience.module.scss';

// Job and School map onto <Org> slightly differently
function JobOrg({ job }: { job: Job }) {
  return (
    <Org
      name={job.name}
      location={job.location}
      time={job.time}
      links={job.links}
      description={job.description}
      position={job.position}
      image={job.image}
      background={job.background}
    />
  );
}

function SchoolOrg({ school }: { school: School }) {
  return (
    <Org
      name={school.name}
      location={school.location}
      time={school.class}
      links={school.links}
      description={school.description}
      position={school.degree}
      image={school.image}
      background={school.background}
      extra={school.extra}
    />
  );
}

function SlideExperience() {
  const { accent, title, sections, jobs, schools, linkText } = useBio().experience;
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

        <TextSection>{sections[0]}</TextSection>
        {jobs.featured.map((job) => (
          <JobOrg key={job.name} job={job} />
        ))}
        <ShowMore>
          {jobs.other.map((job) => (
            <JobOrg key={job.name} job={job} />
          ))}
        </ShowMore>

        <TextSection>{sections[1]}</TextSection>
        {schools.featured.map((school) => (
          <SchoolOrg key={school.name} school={school} />
        ))}
        <ShowMore>
          {schools.other.map((school) => (
            <SchoolOrg key={school.name} school={school} />
          ))}
        </ShowMore>

        <TextSection>{sections[2]}</TextSection>
        <Skills />
      </div>
    </ScrollElement>
  );
}

export { SlideExperience };

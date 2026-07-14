import * as Scroll from 'react-scroll';

import { TextTitle, TextSection, TextAccent, Text, ShowMore } from 'src/elements';
import { Bio } from 'src/content';

import { Org } from './org/Org';
import { Skills } from './skills/Skills';
import * as Style from './SlideExperience.module.scss';

const ScrollComponent = Scroll.Element;

const SlideExperience = () => {
  return (
    <ScrollComponent className={Style.slideExperience} name="experience">
      <div className={Style.preSlideCurveHolder}>
        <div className={Style.preSlideCurve} />
      </div>
      <div className={Style.slideBody}>
        <TextAccent mono animate>{Bio.experience.accent}</TextAccent>
        <TextTitle>{Bio.experience.title}</TextTitle>
        <Text links={Bio.experience.link_text.links}>{Bio.experience.link_text.text[0]}</Text>
        <TextSection>{Bio.experience.sections[0]}</TextSection>
        {Bio.experience.jobs.featured.map((job, i) => (
          <Org
            key={i}
            name={job.name}
            location={job.location}
            time={job.time}
            links={job.links}
            description={job.description}
            position={job.position}
            image={job.image}
            background={job.background}
          />
        ))}
        <ShowMore>
          {Bio.experience.jobs.other.map((job, i) => (
            <Org
              key={i}
              name={job.name}
              location={job.location}
              time={job.time}
              links={job.links}
              description={job.description}
              position={job.position}
              image={job.image}
              background={job.background}
            />
          ))}
        </ShowMore>

        <TextSection>{Bio.experience.sections[1]}</TextSection>
        {Bio.experience.schools.featured.map((school, i) => (
          <Org
            key={i}
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
        ))}
        <ShowMore>
          {Bio.experience.schools.other.map((school, i) => (
            <Org
              key={i}
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
          ))}
        </ShowMore>

        <TextSection>{Bio.experience.sections[2]}</TextSection>
        <Skills />
      </div>
    </ScrollComponent>
  );
};

export { SlideExperience };

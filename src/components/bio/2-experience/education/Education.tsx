import { TextSection, ShowMore } from 'src/elements';
import type { School } from 'src/content';

import { Org } from '../org/Org';

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

type EducationProps = { title: string; featured: School[]; other: School[] };

function Education({ title, featured, other }: EducationProps) {
  return (
    <>
      <TextSection>{title}</TextSection>
      {featured.map((school) => (
        <SchoolOrg key={school.name} school={school} />
      ))}
      <ShowMore>
        {other.map((school) => (
          <SchoolOrg key={school.name} school={school} />
        ))}
      </ShowMore>
    </>
  );
}

export { Education };

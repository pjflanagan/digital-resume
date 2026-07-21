import { TextSection, ShowMore } from 'src/elements';
import type { Job } from 'src/content';

import { Org } from '../org/Org';

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

type JobsProps = { title: string; featured: Job[]; other: Job[] };

function Jobs({ title, featured, other }: JobsProps) {
  return (
    <>
      <TextSection>{title}</TextSection>
      {featured.map((job) => (
        <JobOrg key={job.name} job={job} />
      ))}
      <ShowMore>
        {other.map((job) => (
          <JobOrg key={job.name} job={job} />
        ))}
      </ShowMore>
    </>
  );
}

export { Jobs };

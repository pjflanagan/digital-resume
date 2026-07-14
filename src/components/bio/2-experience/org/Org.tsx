import { useEffect, useState, useRef } from 'react';
import { useReveal } from 'src/hooks';
import type { ContentLink, SchoolExtra } from 'src/content';
import {
  Avatar,
  Text,
  TextLinkedHeader,
  TextHeading,
  TextSubHeading,
  TextAccent,
} from 'src/elements';

import * as Style from './Org.module.scss';

const IMG_ROOT = '/img/bio/2-experience';

type OrgProps = {
  name: string;
  time: string;
  location: string;
  description: string[];
  position?: string;
  image: string;
  links?: ContentLink[];
  background: string;
  extra?: SchoolExtra[];
};

const Org = ({
  name,
  time,
  location,
  description,
  position,
  image,
  links,
  background,
  extra,
}: OrgProps) => {
  const bulletPointLength = description.length + (extra || []).length;
  const [bulletPointRevealIndex, setBulletPointRevealIndex] = useState(-1);

  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 132 });

  useEffect(() => {
    if (isRevealed && bulletPointRevealIndex < bulletPointLength) {
      setTimeout(() => {
        setBulletPointRevealIndex(bulletPointRevealIndex + 1);
      }, 100);
    }
  }, [isRevealed, bulletPointRevealIndex, bulletPointLength]);


  function getClassName(index: number, offset = 0) {
    return bulletPointRevealIndex >= index + offset ? Style.revealed : Style.hidden;
  }

  return (
    <div className={Style.org} ref={ref}>
      <div className={Style.orgLeft}>
        <div className={Style.avatarHolder}>
          <Avatar src={`${IMG_ROOT}/${image}`} name={name} background={background} />
        </div>
        <div className={Style.orgInfoHolder}>
          <TextHeading className={Style.name}>{name}</TextHeading>
          <Text className={Style.location}>{location}</Text>
          <TextAccent className={Style.time}>{time}</TextAccent>
        </div>
      </div>
      <div className={Style.orgRight}>
        {!!position && <TextHeading className={Style.position}>{position}</TextHeading>}
        {description.map((line, i) => (
          <Text key={i} links={links} className={getClassName(i)}>
            {line}
          </Text>
        ))}
      </div>
      {!!extra &&
        extra.map((org, i) => (
          <div key={i} className={`${Style.orgExtra} ${getClassName(i, description.length)}`}>
            <div className={Style.orgLeft}></div>
            <div className={Style.orgRight}>
              <TextLinkedHeader href={org.link || ''} className={Style.name} color="cyan">
                {org.name}
              </TextLinkedHeader>
              <TextSubHeading>{org.position}</TextSubHeading>
              <Text key={i}>{org.description}</Text>
            </div>
          </div>
        ))}
    </div>
  );
};

export { Org };

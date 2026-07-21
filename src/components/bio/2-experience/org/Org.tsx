import React, { useRef } from 'react';
import clsx from 'clsx';
import { useReveal } from 'src/hooks';
import type { ContentLink, SchoolExtra } from 'src/content';
import { contentImage } from 'src/content';
import {
  Avatar,
  Text,
  TextLinkedHeader,
  TextHeading,
  TextSubHeading,
  TextAccent,
} from 'src/elements';

import * as Style from './Org.module.scss';

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

type BulletProps = {
  revealed: boolean;
  style?: React.CSSProperties;
  links?: ContentLink[];
  children: string;
};

function Bullet({ revealed, style, links, children }: BulletProps) {
  return (
    <Text
      links={links}
      style={style}
      className={clsx(Style.bulletPoint, revealed ? Style.revealed : Style.hidden)}
    >
      {children}
    </Text>
  );
}

function Org({
  name,
  time,
  location,
  description,
  position,
  image,
  links,
  background,
  extra,
}: OrgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 180 });

  function bulletStyle(index: number, offset = 0): React.CSSProperties {
    return { transitionDelay: `${(index + offset) * 100}ms` };
  }

  return (
    <div className={Style.org} ref={ref}>
      <div className={Style.orgLeft}>
        <div className={Style.avatarHolder}>
          <Avatar src={contentImage('experience', image)} name={name} background={background} />
        </div>
        <div className={Style.orgInfoHolder}>
          <TextHeading className={Style.name}>{name}</TextHeading>
          <Text className={Style.time}>{time}</Text>
          <TextAccent className={Style.location}>{location}</TextAccent>
        </div>
      </div>
      <div className={Style.orgRight}>
        {!!position && <TextHeading className={Style.position}>{position}</TextHeading>}
        {description.map((line, i) => (
          <Bullet key={i} links={links} revealed={isRevealed} style={bulletStyle(i)}>
            {line}
          </Bullet>
        ))}
      </div>
      {!!extra &&
        extra.map((org, i) => (
          <div
            key={org.name}
            className={clsx(
              Style.orgExtra,
              isRevealed ? Style.revealed : Style.hidden,
              Style.bulletPoint
            )}
            style={bulletStyle(i, description.length)}
          >
            <div className={Style.orgLeft}></div>
            <div className={Style.orgRight}>
              <TextLinkedHeader href={org.link || ''} className={Style.name} color="cyan">
                {org.name}
              </TextLinkedHeader>
              <TextSubHeading>{org.position}</TextSubHeading>
              <Text>{org.description}</Text>
            </div>
          </div>
        ))}
    </div>
  );
}

export { Org };

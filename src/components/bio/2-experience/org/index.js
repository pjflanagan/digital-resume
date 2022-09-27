import React, { useEffect, useState, useRef } from "react";
import { useReveal } from "src/hooks";
import { FindImage } from "src/content";
import {
  Avatar,
  Text,
  TextLinkedHeader,
  TextHeading,
  TextSubHeading,
  TextAccent
} from "src/elements";

import * as Style from "./style.module.scss";

const Org = ({
  name,
  time,
  location,
  description,
  position,
  image,
  links,
  data,
  background,
  extra,
}) => {
  const bulletPointLength = description.length + (extra || []).length;
  const [bulletPointRevealIndex, setBulletPointRevealIndex] = useState(-1);

  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 132 });

  useEffect(() => {
    if (isRevealed && bulletPointRevealIndex < bulletPointLength) {
      setTimeout(() => {
        setBulletPointRevealIndex(bulletPointRevealIndex + 1);
      }, 100);
    }
  }, [isRevealed, bulletPointRevealIndex, bulletPointLength]);

  const imageData = FindImage({ data, image });

  function getClassName(index, offset = 0) {
    return bulletPointRevealIndex >= index + offset ? Style.revealed : Style.hidden;
  }

  return (
    <div className={Style.org} ref={ref}>
      <div className={Style.orgLeft}>
        <div className={Style.avatarHolder}>
          <Avatar
            image={imageData}
            name={name}
            background={background}
          />
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
              <TextLinkedHeader href={org.link} className={Style.name} color="cyan">{org.name}</TextLinkedHeader>
              <TextSubHeading>{org.position}</TextSubHeading>
              <Text key={i}>
                {org.description}
              </Text>
            </div>
          </div>
        ))}
    </div>
  );
};

export { Org };

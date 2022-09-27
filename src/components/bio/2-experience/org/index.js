import React, { useEffect } from "react";

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
  const [textRevealIndex, setTextRevealIndex] = useState(-1);

  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 132 });

  useEffect(() => {
    if (textRevealIndex < description.length) {
      setTimeout(() => {
        setTextRevealIndex(textRevealIndex + 1);
      });
    }
  }, [isRevealed, textRevealIndex]);

  const imageData = FindImage({ data, image });

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
          <Text key={i} links={links} className={textRevealIndex >= i ? Style.descriptionRevealed : Style.descriptionHidden}>
            {line}
          </Text>
        ))}
      </div>
      {!!extra &&
        extra.map((org, i) => (
          <div key={i} className={Style.orgExtra}>
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

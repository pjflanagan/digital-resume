import React from "react";

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
}) => (
  <div className={Style.org}>
    <div className={Style.orgLeft}>
      <div className={Style.avatarHolder}>
        <Avatar
          image={image}
          name={name}
          data={data}
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
        <Text key={i} links={links}>
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

export { Org };

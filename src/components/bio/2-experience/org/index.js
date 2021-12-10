import React from "react";

import {
  Avatar,
  Text,
  TextLinkedHeader,
  TextSectionHeading,
  TextSectionSubHeading,
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
        <TextSectionHeading className={Style.name}>{name}</TextSectionHeading>
        <Text className={Style.location}>{location}</Text>
        <TextAccent className={Style.time}>{time}</TextAccent>
      </div>
    </div>
    <div className={Style.orgRight}>
      {!!position && <TextSectionHeading className={Style.position}>{position}</TextSectionHeading>}
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
            <TextSectionSubHeading>{org.position}</TextSectionSubHeading>
            <Text key={i}>
              {org.description}
            </Text>
          </div>
        </div>
      ))}
  </div>
);

export { Org };

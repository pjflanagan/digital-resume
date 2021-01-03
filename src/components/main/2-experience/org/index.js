import React from "react";

import { Avatar, Text, TextLinkedHeader } from "../../../../elements";

import Style from "./style.module.scss";

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
          gap={132}
          edge="top"
          image={image}
          name={name}
          data={data}
          background={background}
        />
      </div>
      <div className={Style.orgInfoHolder}>
        <div className={Style.name}>{name}</div>
        <div className={Style.location}>{location}</div>
        <div className={Style.time}>{time}</div>
      </div>
    </div>
    <div className={Style.orgRight}>
      {position && <div className={Style.position}>{position}</div>}
      {description.map((line, i) => (
        <Text key={i} className={Style.description} links={links}>
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
            <div className={Style.position}>{org.position}</div>
            <Text key={i} className={Style.description}>
              {org.description}
            </Text>
          </div>
        </div>
      ))}
  </div>
);

export { Org };

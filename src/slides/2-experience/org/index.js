import React from "react";

import { Avatar, Text } from "../../../elements";
import Style from "./style.module.scss";

const Org = ({
  name,
  time,
  location,
  description,
  position,
  image,
  data,
  color,
  background,
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
      <div className={Style.position}>{position}</div>
      {description.map((line, i) => (
        <Text
          key={i}
          className={Style.description}
          dangerouslySetInnerHTML={{ __html: line }}
        ></Text>
      ))}
    </div>
  </div>
);

export { Org };


import React from 'react'

import { Avatar } from "../../../elements";
import Style from './style.module.scss';

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
  <div className={Style.segment}>
    <Avatar
      gap={132}
      edge="top"
      image={image}
      name={name}
      data={data}
      background={background}
    />
    <div className={Style.segmentLeft}>
      <div className={Style.org}>
        {name}
      </div>
      <div className={Style.location}>{location}</div>
      <div className={Style.time}>{time}</div>
    </div>
    <div className={Style.segmentRight}>
      <div className={Style.position}>{position}</div>
      {description.map((line, i) => (
        <p
          key={i}
          className={Style.description}
          dangerouslySetInnerHTML={{ __html: line }}
        ></p>
      ))}
    </div>
  </div>
);

export { Org }
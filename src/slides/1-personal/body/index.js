import React from 'react';

import Style from './style.module.scss';

const Body = () => (
  <div>
    <h1 className={Style.name}>Peter James Flanagan</h1>
    <p className={Style.bio}>
      I'm a full-stack software engineer living in New York. I fell in love with web development
      at a young age and have been having playing with it ever since. I enjoy making useful, deliberatley 
      designed, and fun web tools.
    </p>
    <p className={`${Style.bio} ${Style.additional}`}>
      Outside of coding, I'm an avid <a target="_blank" rel="noreferrer" href="//instagram.com/roller.babe">rollerblader</a>,
      a novice <span>rock climber</span>, and an eager Mandarin student.
    </p>
  </div>
);

export { Body }
import React from 'react'

import * as Style from './style.module.scss';

const Splash = ({ isVisible }) => {
  const className = isVisible ? Style.visible : Style.hidden;
  return (
    <div className={`${Style.splash} ${className}`}></div>
  );
};

export { Splash };
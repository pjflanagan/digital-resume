import classNames from 'classnames';
import React from 'react'

import * as Style from './style.module.scss';

const Splash = ({ isVisible }) => {
  const className = classNames(Style.splash, {
    [Style.visible]: isVisible,
    [Style.hidden]: !isVisible
  });
  return (
    <div className={className} />
  );
};

export { Splash };
import classNames from 'classnames';
import React from 'react'

import * as Style from './style.module.scss';

type SplashProps = {
  isVisible: boolean;
};

const Splash = ({ isVisible }: SplashProps) => {
  const className = classNames(Style.splash, {
    [Style.visible]: isVisible,
    [Style.hidden]: !isVisible
  });
  return (
    <div className={className} />
  );
};

export { Splash };

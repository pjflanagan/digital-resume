import type { ReactNode } from 'react';
import clsx from 'clsx';

import * as Style from './Splash.module.scss';

type SplashProps = {
  isVisible: boolean;
};

function Splash({ isVisible }: SplashProps): ReactNode {
  const className = clsx(Style.splash, {
    [Style.visible]: isVisible,
    [Style.hidden]: !isVisible,
  });
  return <div className={className} />;
}

export { Splash };

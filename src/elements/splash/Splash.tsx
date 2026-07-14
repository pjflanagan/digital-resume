import clsx from 'clsx';

import * as Style from './Splash.module.scss';

type SplashProps = {
  isVisible: boolean;
};

const Splash = ({ isVisible }: SplashProps) => {
  const className = clsx(Style.splash, {
    [Style.visible]: isVisible,
    [Style.hidden]: !isVisible,
  });
  return <div className={className} />;
};

export { Splash };

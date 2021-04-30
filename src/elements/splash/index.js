import React from 'react'

import Style from './style.module.scss';

class Splash extends React.Component {
  render() {
    const { isVisible } = this.props;
    const className = isVisible ? Style.visible : Style.hidden;
    return (
      <div className={`${Style.splash} ${className}`}></div>
    );
  }
};

export { Splash };
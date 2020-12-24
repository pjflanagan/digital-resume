import React from 'react'

import Style from './style.module.scss';

// TODO: this is more of a loading screen, slide: 0-splash should be renamed to intro/landing

class Splash extends React.Component {
  render() {
    const className = this.props.isLoaded ? Style.hidden : '';
    return (
      <div className={`${Style.splash} ${className}`}></div>
    );
  }
};

export { Splash };
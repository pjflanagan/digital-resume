import React from 'react'

import Style from './style.module.scss';

class Splash extends React.Component {
  render() {
    const className = this.props.isLoaded ? Style.hidden : '';
    return (
      <div className={`${Style.splash} ${className}`}></div>
    );
  }
};

export { Splash };
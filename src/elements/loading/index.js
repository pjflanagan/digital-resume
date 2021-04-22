import React from 'react'

import Style from './style.module.scss';

// TODO: this is more of a loading screen, slide: 0-splash should be renamed to 0-landing, this can be called splash

class LoadingCover extends React.Component {
  render() {
    const { isLoading } = this.props;
    const className = isLoading ? Style.visible : Style.hidden;
    return (
      <div className={`${Style.splash} ${className}`}></div>
    );
  }
};

export { LoadingCover };
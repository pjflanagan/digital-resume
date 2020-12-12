import React from "react";

import { Multipass } from './multipass'
import { LabeledButton } from '../../elements'

import Style from './style.module.scss'

class SlideContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multipassOn: false,
    };

    this.setMultipassOn = this.setMultipassOn.bind(this);
  }

  setMultipassOn(on) {
    this.setState({
      multipassOn: on
    })
  }

  render() {
    const { data } = this.props;
    return (
      <div className={Style.slideContact}>
        <div className={Style.slideLeft}>
          <h1 className={Style.title}>Let's make contact!</h1>
          <div className={Style.linkHolder}>
            <LabeledButton
              name="Email"
              onMouseEnter={() => this.setMultipassOn(true)}
              onMouseLeave={() => this.setMultipassOn(false)}
            />
            <LabeledButton
              name="Github"
              onMouseEnter={() => this.setMultipassOn(true)}
              onMouseLeave={() => this.setMultipassOn(false)}
            />
            <LabeledButton
              name="LinkedIn"
              onMouseEnter={() => this.setMultipassOn(true)}
              onMouseLeave={() => this.setMultipassOn(false)}
            />
          </div>
        </div>
        <div className={Style.slideRight}>
          <div className={Style.multipassHolder}>
            <Multipass on={this.state.multipassOn} data={data} />
          </div>
        </div>
        <div className={Style.cover}></div>
      </div>
    );
  }
}

export { SlideContact }
import React from "react";

import { Multipass } from './multipass'
import { LabeledButton } from '../../elements'

import './style.scss'

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
      <div class="slide-contact">
        <div class="slide-left">
          <h1 class="title">Let's make contact!</h1>
          <div class="link-holder">
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
        <div class="slide-right">
          <div class="multipass-holder">
            <Multipass on={this.state.multipassOn} data={data} />
          </div>
        </div>
        <div class="cover"></div>
      </div>
    );
  }
}

export { SlideContact }
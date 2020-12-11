import React from "react";

import { Multipass } from './multipass'
import { LabeledButton } from '../../../elements'

import './style.scss'

class SlideContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multipassOn: false,
    };
  }

  render() {
    return (
      <div class="slide-contact">
        <div class="slide-left">
          <h1 class="title">Let's make contact!</h1>
          <div class="link-holder">
            <LabeledButton name="Email" />
            <LabeledButton name="Github" />
            <LabeledButton name="LinkedIn" />
          </div>
        </div>
        <div class="slide-right">
          <div class="multipass-holder">
            <Multipass on={this.state.multipassOn} />
          </div>
        </div>
        <div class="cover"></div>
      </div>
    );
  }
}

export { SlideContact }
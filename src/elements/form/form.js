import React from 'react';

import { SVGIcon } from "../icon";
import ButtonStyle from '../button/style.module.scss';

import Style from './style.module.scss';

class Form extends React.Component {
  render() {
    const { children, errorMessages, onSubmit } = this.props;
    return (
      <div className={Style.formContent}>
        <form onSubmit={onSubmit} className={Style.form}>
          <span>
            {children}
          </span>
          <button className={ButtonStyle.labeledButton} type="submit">
            <div className={ButtonStyle.svgHolder}>
              <SVGIcon icon="saturn" />
            </div>
            <div className={ButtonStyle.name}>Send</div>
          </button>
        </form>
        <div className={Style.errorMessages}>
          {errorMessages.map(({ message }, i) => (
            <div key={i} className={Style.errorMessage}>{message}</div>
          ))}
        </div>
      </div>
    );
  }
}

export { Form }
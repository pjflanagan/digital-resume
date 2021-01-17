import React from 'react';

// import { LabeledButton } from '../button';

import Style from './style.module.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessages: [],
      isSubmitted: false
    }

  }

  submit() {
    // validate first
    const [isValid, errorMessages] = this.validate();
    if (!isValid) {
      // if this isn't valid then set error messages
      this.error(errorMessages)
      return;
    }
    // TODO: otherwise, do the submitting
  }

  validate() {
    let isValid = true;
    const errorMessages = [];

    this.props.children.forEach(child => {
      const [childIsValid, errorMessage] = child.validate()
      if (childIsValid) {
        isValid = false;
        errorMessages.push(errorMessage);
      }
    });

    return [isValid, errorMessages];
  }

  error(errorMessages) {
    this.setState({
      errorMessages: errorMessages
    });
  }

  success() {
    const { successCallback } = this.props;

    this.setState({
      errorMessages: [],
      isSubmitted: true // TODO: make the form fade and be deactivated
    });

    if (!!successCallback) {
      successCallback();
    }
  }

  render() {
    const { errorMessages } = this.state;
    const { children } = this.props;
    return (
      <div className={Style.formContent}>
        <div className={Style.errorMessages}>
          {errorMessages.map((message) => (
            <div className={Style.errorMessage}>{message}</div>
          ))}
        </div>
        <form onSubmit={this.submit} className={Style.form}>
          <span>
            {children}
          </span>
          <input type="submit" value="Submit" />
          {/* <LabeledButton

            icon="saturn"
            trackerLabel="Contact.submitForm" // TODO: make this come from props
            onClick={ }
          // onMouseEnter={() => this.props.setContactOnCallback(true)}
          // onMouseLeave={() => this.props.setContactOnCallback(false)}
          /> */}
        </form>
      </div>
    );
  }
}

class FormComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initalValue || "",
      isError: false
    }
  }

  error() {
    this.setState({
      isError: true
    });
  }
}

class FormEmail extends FormComponent {

  validate() {
  }

  render() {
    return (
      <input type="email" placeholder="Email" className={Style.formField} />
    );
  }
}

class FormName extends FormComponent {

  validate() {
    if (this.state.value.length === 0) {
      this.error();
      return [false, "Be sure to let me know your name"];
    }
    return [true];
  }

  render() {
    return (
      <input type="text" placeholder="Name" className={Style.formField} />
    );
  }
}

const FormMessage = () => (
  <textarea placeholder="Message..." className={Style.formField} rows="4"></textarea>
);

export { Form, FormEmail, FormName, FormMessage }
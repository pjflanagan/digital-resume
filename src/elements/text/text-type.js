
import React from 'react'
import PropTypes from 'prop-types'

// TODO: make this a wrapper for multiple Text objects so you can do a few in a row
// Also text objects need thier own min height, instead of this setting the first character thing

class TextType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typed: "",
    };

    this.timeoutID = 0;

    this.type = this.type.bind(this);
  }

  componentDidMount() {
    if (this.props.revealed) {
      this.setState({
        typed: this.props.children
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.revealed && this.props.revealed) {
      // if it was not revealed before but is now then reveal it
      this.type(0);
    } else if (this.props.revealed && prevProps.children !== this.props.children) {
      // if it is revealed and it's children text just changed, retype
      this.type(0);
    }
  }

  type(nextCharIndex) {
    clearTimeout(this.timeoutID);
    const typed = nextCharIndex === 0 ? '' : this.state.typed;
    const { children, speed } = this.props;
    this.setState({
      typed: typed + children[nextCharIndex],
    });
    if (nextCharIndex !== children.length - 1) {
      this.timeoutID = setTimeout(() => this.type(nextCharIndex + 1), speed);
    }
  }

  render() {
    const { typed } = this.state;
    return <span>{typed}</span>;
  }
}

TextType.propTypes = {
  children: PropTypes.string,
  revealed: PropTypes.bool
};


export { TextType };
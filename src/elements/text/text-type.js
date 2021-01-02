
import React from 'react'
import PropTypes from 'prop-types'

class TextType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typed: "",
    };

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
    const typed = nextCharIndex === 0 ? '' : this.state.typed;
    const { children, speed } = this.props;
    this.setState({
      typed: typed + children[nextCharIndex],
    });
    if (nextCharIndex !== children.length - 1) {
      setTimeout(() => this.type(nextCharIndex + 1), speed);
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
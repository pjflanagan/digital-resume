import React from "react";

// TODO: this is not used

// Usage
// 1. pass 'scrollRef' into <ExtendsScrollComponent scrollRef={React.createRef()} /> on parent
// 2. use state.windowScroll or state.relativeScroll in render()
class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

    this.state = {
      windowScroll: 0,
      relativeScroll: 0
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const bounds = this.ref.current.getBoundingClientRect();
    this.setState({
      windowScroll: window.scrollY,
      relativeScroll: bounds.top
    });
  }
}

export { Scroll };

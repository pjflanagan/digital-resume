import React from "react";

// Usage
// 1. define scrollRef = React.createRef() on a parent element of ExtendsScrollComponent.render()
// 2. pass 'scrollRef' and 'end' into <ExtendsScrollComponent scrollRef={scrollRef} end={scrollLength} />
// 3. use state.windowScroll or state.relativeScroll in render()
class Scroll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowScroll: 0,
      relativeScroll: 0
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(e) {
    const { scrollRef } = this.props.scrollRef;
    const bounds = scrollRef.current.getBoundingClientRect();
    this.setState({
      windowScroll: window.scrollY,
      relativeScroll: bounds.top
    });
  }
}

export { Scroll };

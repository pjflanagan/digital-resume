import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'

// Usage
// 1. pass in 'gap' and 'edge' as props on <ExtendsRevealComponent />
// 2. set ref={this.ref} on an element inside ExtendsRevealComponent.render()
// 3. use state.isRevealed 
// TODO: and/or set a revealCallback function
class Reveal extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

    this.state = {
      isRevealed: false
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', _.throttle(this.handleScroll, 40));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', _.throttle(this.handleScroll, 40));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isRevealed && !this.state.isRevealed;
  }

  handleScroll(e) {
    const bounds = this.ref.current.getBoundingClientRect();
    const viewPoint = bounds[this.props.edge] + this.props.gap;
    if (viewPoint < window.innerHeight) {
      this.setState({ isRevealed: true });
      window.removeEventListener('scroll', _.throttle(this.handleScroll, 120));
    }
  }

  // TODO: not sure if this would work, it would then look like
  // <Reveal gap={} edge={}><div /></Reveal>
  // not sure how to use the reveal state though..?
  // render() {
  //   return (
  //     <div ref={this.ref}>
  //       { this.props.children }
  //     </div>
  //   )
  // }
}

Reveal.propTypes = {
  edge: PropTypes.oneOf(['top', 'bottom']),
  gap: PropTypes.number
};

export { Reveal }
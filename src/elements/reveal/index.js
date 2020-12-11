import React from 'react'

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
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const bounds = this.ref.current.getBoundingClientRect();
    const viewPoint = bounds[this.props.edge] + this.props.gap;
    if(viewPoint < window.innerHeight) {
      this.setState({
        isRevealed: true
      });
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
}

export { Reveal }
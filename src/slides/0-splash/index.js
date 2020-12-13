
import React, { useRef, useEffect } from 'react'
import { Canvas } from './canvas.js';
import Styles from './style.module.scss';

// CanvasComponent
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const CanvasComponent = props => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvasElem = canvasRef.current
    new Canvas(canvasElem);
  }, []);
  
  return <canvas className={Styles.canvas} ref={canvasRef} {...props}/>
}

// SlideSplash

class SlideSplash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transform: 0
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
    this.setState({
      transform: -window.scrollY / 6
    });
  }

  render() {
    return (
      <div className={Styles.splash}>
        <div
          className={Styles.titleContainer}
          style={{
            transform: `translateY(${this.state.transform}px)`
          }}
        >
          <div className={Styles.name}>Peter James Flanagan</div>
          <div className={Styles.description}>Circuit-navigating Cyberspace</div>
        </div>
        <CanvasComponent></CanvasComponent>
      </div>
    )
  }
}

export { SlideSplash };

import React, { useRef, useEffect } from 'react'

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const Canvas = props => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvasElem = canvasRef.current
    props.view.init(canvasElem);
  }, []);
  
  return <canvas className={props.className} ref={canvasRef} {...props}/>
}

export { Canvas };
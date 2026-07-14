import React, { useRef, useEffect } from 'react';

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

type CanvasView = new (canvasElem: HTMLCanvasElement) => unknown;

type CanvasProps = {
  view: CanvasView;
  className?: string;
  style?: React.CSSProperties;
};

const Canvas = (props: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      new props.view(canvasElem);
    }
    // eslint-disable-next-line
  }, []);

  return <canvas className={props.className} style={props.style} ref={canvasRef} />;
};

export { Canvas };
export type { CanvasView };

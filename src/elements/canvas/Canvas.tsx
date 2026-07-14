import React, { useRef, useEffect } from 'react';

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

type CanvasView = new (canvasElem: HTMLCanvasElement) => { destroy(): void };

type CanvasProps = {
  view: CanvasView;
  className?: string;
  style?: React.CSSProperties;
};

const Canvas = ({ view: View, className, style }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (!canvasElem) {
      return;
    }
    const view = new View(canvasElem);
    return () => view.destroy();
  }, [View]);

  return <canvas className={className} style={style} ref={canvasRef} />;
};

export { Canvas };
export type { CanvasView };

import React, { useRef, useEffect } from 'react';

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

type CanvasView = new (canvasElem: HTMLCanvasElement) => { destroy(): void };

type CanvasProps = {
  view: CanvasView;
  // sizing/position is page background art direction (fixed vs absolute, breakpoints);
  // stays a composition seam like ButtonHolder's className, not a bounded set of variants
  className?: string;
  style?: React.CSSProperties;
};

function Canvas({ view: View, className, style }: CanvasProps): React.ReactNode {
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
}

export { Canvas };

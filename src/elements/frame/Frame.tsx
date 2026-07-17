import React from 'react';

import * as Style from './Frame.module.scss';

function getFrameTypeClassName(type: string): string {
  return (
    ({
      'top-left': Style.topLeft,
      'top-right': Style.topRight,
      'bottom-left': Style.bottomLeft,
      'bottom-right': Style.bottomRight,
    })[type] || Style[type]
  );
}

type FrameProps = {
  type: string;
  style?: React.CSSProperties;
};

// Frame takes a type, and optional styles
function Frame({ type, style }: FrameProps): React.ReactNode {
  return <div className={`${Style.frame} ${getFrameTypeClassName(type)}`} style={style}></div>;
}

type FrameHolderProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

// FrameHolder takes optional children and styles
function FrameHolder({ children, style, className }: FrameHolderProps): React.ReactNode {
  return (
    <div className={className} style={style}>
      <Frame type="top-left" />
      <Frame type="top-right" />
      <Frame type="bottom-left" />
      <Frame type="bottom-right" />
      {children}
    </div>
  );
}

export { Frame, FrameHolder };

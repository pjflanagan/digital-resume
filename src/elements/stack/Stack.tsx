import React, { useRef, useState } from "react";
import clsx from 'clsx';

import { useReveal } from "src/hooks";

import * as Style from "./Stack.module.scss";

const getNextLayerIndex = (currentLayer: number, offset: number, layersLength: number): number => {
  if (currentLayer + offset >= layersLength) {
    return currentLayer - layersLength + offset;
  } else if (currentLayer + offset < 0) {
    return layersLength + currentLayer + offset;
  }
  return currentLayer + offset;
};

type StackNavProps = {
  current: number;
  count: number;
  selectLayer: (i: number) => void;
};

const StackNav = ({ current, count, selectLayer }: StackNavProps) => {
  return (
    <div className={Style.stackNav}>
      {[...Array(count)].map((e, i) => {
        const className = clsx(Style.stackBullet, {
          [Style.current]: i === current,
        });
        return (
          <div
            key={i}
            className={Style.bulletHolder}
            onClick={() => selectLayer(i)}
            onKeyDown={() => selectLayer(i)}
            role="button"
            tabIndex={0}
          >
            <div className={className} />
          </div>
        );
      })}
    </div>
  );
}

type StackProps = {
  children: React.ReactElement<{ name: string }>[];
};

const Stack = ({
  children
}: StackProps) => {

  const ref = useRef<HTMLDivElement>(null)
  const isRevealed = useReveal({ ref, gap: 240 });
  const [currentLayer, setCurrentLayer] = useState(0);

  const className = clsx(Style.stack, {
    [Style.preReveal]: !isRevealed
  });

  const getNextLayer = (offset: number) => {
    const layerIndex = getNextLayerIndex(currentLayer, offset, children.length);
    return {
      layerIndex,
      name: children[layerIndex].props.name,
    };
  };
  const layers = [-1, 0, 1, 2, 3, 4].map(i => getNextLayer(i));

  return (
    <div className={className} ref={ref}>
      <div className={Style.stackBody}>
        {layers.map((layer) => (
          <div
            key={layer.layerIndex}
            className={Style.layer}
            onClick={() => setCurrentLayer(layer.layerIndex)}
            onKeyDown={() => setCurrentLayer(layer.layerIndex)}
            role="button"
            tabIndex={0}
          >
            <div className={Style.name}>{layer.name}</div>
            {children[layer.layerIndex]}
          </div>
        ))}
      </div>
      <StackNav
        count={children.length}
        current={currentLayer}
        selectLayer={setCurrentLayer}
      />
    </div>
  );
}

export { Stack };

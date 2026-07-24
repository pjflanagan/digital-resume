import React, { useRef, useState } from 'react';
import clsx from 'clsx';

import { useReveal } from 'src/hooks';
import { activationKeyHandler } from 'src/helpers';

import * as Style from './Stack.module.scss';

function getNextLayerIndex(currentLayer: number, offset: number, layersLength: number): number {
  if (currentLayer + offset >= layersLength) {
    return currentLayer - layersLength + offset;
  } else if (currentLayer + offset < 0) {
    return layersLength + currentLayer + offset;
  }
  return currentLayer + offset;
}

type StackNavProps = {
  current: number;
  count: number;
  selectLayer: (i: number) => void;
};

function StackNav({ current, count, selectLayer }: StackNavProps): React.ReactNode {
  return (
    <div className={Style.stackNav}>
      {[...Array(count)].map((e, i) => {
        const className = clsx(Style.stackBullet, {
          [Style.current]: i === current,
        });
        return (
          <button
            key={i}
            type="button"
            className={Style.bulletHolder}
            onClick={() => selectLayer(i)}
          >
            <div className={className} />
          </button>
        );
      })}
    </div>
  );
}

type StackProps = {
  children: React.ReactElement<{ name: string }>[];
};

function Stack({ children }: StackProps): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const isRevealed = useReveal({ ref, gap: 320 });
  const [currentLayer, setCurrentLayer] = useState(0);

  const className = clsx(Style.stack, {
    [Style.preReveal]: !isRevealed,
  });

  function getNextLayer(offset: number): { layerIndex: number; name: string } {
    const layerIndex = getNextLayerIndex(currentLayer, offset, children.length);
    return {
      layerIndex,
      name: children[layerIndex].props.name,
    };
  }
  const layers = [-1, 0, 1, 2, 3, 4].map((i) => getNextLayer(i));

  return (
    <div className={className} ref={ref}>
      <div className={Style.stackBody}>
        {layers.map((layer) => (
          <div
            key={layer.layerIndex}
            className={Style.layer}
            onClick={() => setCurrentLayer(layer.layerIndex)}
            onKeyDown={activationKeyHandler(() => setCurrentLayer(layer.layerIndex))}
            role="button"
            tabIndex={0}
          >
            <div className={Style.name}>{layer.name}</div>
            {children[layer.layerIndex]}
          </div>
        ))}
      </div>
      <StackNav count={children.length} current={currentLayer} selectLayer={setCurrentLayer} />
    </div>
  );
}

export { Stack };

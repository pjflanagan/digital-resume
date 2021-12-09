import React, { useRef, useState } from "react";

import { useReveal } from "src/hooks";

import * as Style from "./style.module.scss";

const getNextLayerIndex = (currentLayer, offset, layersLength) => {
  if (currentLayer + offset >= layersLength) {
    return currentLayer - layersLength + offset;
  } else if (currentLayer + offset < 0) {
    return layersLength + currentLayer + offset;
  }
  return currentLayer + offset;
};

const StackNav = ({ current, count, selectLayer }) => {
  return (
    <div className={Style.stackNav}>
      {[...Array(count)].map((e, i) => {
        const className = i === current ? Style.current : "";
        return (
          <div
            key={i}
            className={Style.bulletHolder}
            onClick={() => selectLayer(i)}
            onKeyDown={() => selectLayer(i)}
            role="button"
            tabIndex={0}
          >
            <div className={`${Style.stackBullet} ${className}`} />
          </div>
        );
      })}
    </div>
  );
}


const Stack = ({
  children
}) => {

  const ref = useRef(null)
  const isRevealed = useReveal({ ref, gap: 240, edge: 'top' });
  const [currentLayer, setCurrentLayer] = useState(0);

  const className = isRevealed ? '' : Style.preReveal;

  const getNextLayer = (offset) => {
    const layerIndex = getNextLayerIndex(currentLayer, offset, children.length);
    return {
      layerIndex,
      name: children[layerIndex].props.name,
    };
  };
  const layers = [-1, 0, 1, 2, 3, 4].map(i => getNextLayer(i));

  return (
    <div className={`${Style.stack} ${className}`} ref={ref}>
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

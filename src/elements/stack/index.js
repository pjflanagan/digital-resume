import React from "react";

import { Reveal } from "../reveal";

import Style from "./style.module.scss";

const getNextLayerIndex = (currentLayer, offset, layersLength) => {
  if (currentLayer + offset >= layersLength) {
    return currentLayer - layersLength + offset;
  } else if (currentLayer + offset < 0) {
    return layersLength + currentLayer + offset;
  }
  return currentLayer + offset;
};

class StackNav extends React.Component {
  render() {
    const { current, count, selectLayer } = this.props;
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
}

class Stack extends Reveal {
  constructor(props) {
    super(props);

    this.state = {
      currentLayer: 0,
    };

    this.selectLayer = this.selectLayer.bind(this);
    this.getNextLayer = this.getNextLayer.bind(this);
  }

  selectLayer(layer) {
    this.setState({
      currentLayer: layer,
    });
  }

  getNextLayer(offset) {
    const { children } = this.props;
    const { currentLayer } = this.state;
    const layerIndex = getNextLayerIndex(currentLayer, offset, children.length);
    return {
      layerIndex,
      name: children[layerIndex].props.name,
    };
  }

  render() {
    const { children } = this.props;
    const { currentLayer } = this.state;
    const className = this.state.isRevealed ? '' : Style.preReveal;
    const layers = [
      this.getNextLayer(-1),
      this.getNextLayer(0),
      this.getNextLayer(1),
      this.getNextLayer(2),
      this.getNextLayer(3),
      this.getNextLayer(4),
    ];
    return (
      <div className={`${Style.stack} ${className}`} ref={this.ref}>
        <div className={Style.stackBody}>
          {layers.map((layer) => (
            <div
              key={layer.layerIndex}
              className={Style.layer}
              onClick={() => this.selectLayer(layer.layerIndex)}
              onKeyDown={() => this.selectLayer(layer.layerIndex)}
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
          selectLayer={this.selectLayer}
        />
      </div>
    );
  }
}

export { Stack };

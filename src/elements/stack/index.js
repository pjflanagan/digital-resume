import React from "react";

import Style from "./style.module.scss";

class Stack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLayer: 0,
    };

    this.nav = props.children.map(({ props }) => props.title);

    this.selectLayer = this.selectLayer.bind(this);
  }

  selectLayer(layer) {
    this.setState({
      currentLayer: layer,
    });
  }

  getNextTwoLayers() {
    const { currentLayer } = this.state;
    const nextTwoLayers = [];
    let counter = currentLayer;
    for (let i = 1; i <= 2; ++i) {
      if (counter + i >= this.nav.length) {
        counter = 0;
      }
      nextTwoLayers.push({
        name: this.nav[counter + i],
        layerIndex: counter + i
      });
    }
    return nextTwoLayers;
  }

  render() {
    const { children } = this.props;
    const { currentLayer } = this.state;
    const nextTwoLayers = this.getNextTwoLayers();
    return (
      <div className={Style.stack}>
        <div className={Style.stackNav}>
          {this.nav.map((name, layerIndex) => (
            <div
              className={layerIndex === currentLayer ? Style.navItemSelected : ""}
              onClick={() => this.selectLayer(layerIndex)}
              onKeyDown={() => this.selectLayer(layerIndex)}
              role="button"
              tabIndex={0}
            >
              {name}
            </div>
          ))}
        </div>
        <div className={Style.stackBody}>
          <div className={Style.topLayer}>{children[currentLayer]}</div>
        </div>
        {nextTwoLayers.map((layer, i) => (
          <div
            className={Style[`nextLayer${layer.layerIndex}`]}
            onClick={() => this.selectLayer(layer.layerIndex)}
            onKeyDown={() => this.selectLayer(layer.layerIndex)}
            role="button"
            tabIndex={0}
          >
            {layer.name}
          </div>
        ))}
      </div>
    );
  }
}

export { Stack };

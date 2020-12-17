import React from "react";

import Style from "./style.module.scss";

// class StackNav extends React.Component {
//   render() {
//     const { nav, selectLayer } = this.props;
//     return (
//       <div className={Style.stackNav}>
//         {nav.map((name, layerIndex) => (
//           <div
//             className={layerIndex === currentLayer ? Style.navItemSelected : ""}
//             onClick={() => selectLayer(layerIndex)}
//             onKeyDown={() => selectLayer(layerIndex)}
//             role="button"
//             tabIndex={0}
//           >
//             {name}
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

const getNextLayerIndex = (currentLayer, offset, layersLength) => {
  if(currentLayer + offset >= layersLength) {
    return currentLayer - layersLength + offset;
  }
  return currentLayer + offset;
}

class Stack extends React.Component {
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
      name: children[layerIndex].props.name
    }
  }

  render() {
    const { children } = this.props;
    const { currentLayer } = this.state;
    const nextTwoLayers = [
      this.getNextLayer(2),
      this.getNextLayer(1)
    ];
    return (
      <div className={Style.stack}>
        <div className={Style.stackBody}>
          <div className={Style.topLayer}>{children[currentLayer]}</div>
          {nextTwoLayers.map((layer) => (
            <div
              key={layer.layerIndex}
              className={Style.nextLayer}
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
      </div>
    );
  }
}

export { Stack };

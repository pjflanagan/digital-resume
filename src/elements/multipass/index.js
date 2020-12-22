import React from "react";

import Style from './style.module.scss'

const calcAge = () => {
  const ageDifMs = Date.now() - new Date("August 11, 1996").getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

class Multipass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      age: calcAge(),
    };
  }

  render() {
    const { on } = this.props;
    const lightClass = on ? Style.light : "";
    const { age } = this.state;
    return (
      <div className={`${Style.multipass} ${lightClass}`}>
        <div className={Style.whiteCard}>
          <div className={Style.multipassTitle}>MULTI PASS</div>
          <div className={`${Style.picture} ${Style.pictureLeft}`}>
            <div className={Style.number}>A5805757</div>
          </div>
          <div className={`${Style.picture} ${Style.pictureRight}`}>
            <div className={Style.number}>C4765536</div>
          </div>
          <div className={Style.bio}>
            <div className={Style.name}>Peter Flanagan</div>
            <div className={`${Style.address} ${Style.yellow}`}>
              New York . NY . USA
              <br />
              Planet Earth
              <br />
              Orion Arm . Milky Way
            </div>
            <div className={Style.traits}>
              Species: Human . Age: {age}
              <br />
              Speed: Moderate <br />
              Strength: Reasonable <br />
              Looks: Adequate
            </div>
            <div className={`${Style.occupation} ${Style.yellow}`}>pj@pjflanagan.me</div>
          </div>
          <div className={Style.blueBar}></div>
        </div>
        <div className={Style.topSquare}>
          <div className={Style.topSquareBar}></div>
        </div>
        <div className={Style.bottomSquare}>
          <div className={Style.bottomSquareWhite}></div>
        </div>
        <div className={Style.bottomLeftCircleGrey}></div>
        <div className={Style.bottomLeftCircleYellow}>
          <div className={Style.bottomLeftCircleShine}></div>
        </div>
        <div className={Style.stripes}></div>
      </div>
    );
  }
}

export { Multipass };

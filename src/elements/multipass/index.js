
const calcAge = () => {
  const ageDifMs = Date.now() - new Date("August 11, 1996").getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};


class Multipass extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      on: false,
      age: calcAge()
    }
    
		this.setLight = this.setLight.bind(this);
  }

  setLight(on) {
		this.setState({
			on
		});
  }

  render() {
    const lightClass = (this.state.on) ? 'light' : ''
    return (
      <div className={`multipass ${lightClass}`}>
        <div className="white-card">
          <div className="multipass-title">MULTI PASS</div>
          <div className="picture picture-left">
            <div className="number">A5805757</div>
          </div>
          <div className="picture picture-right">
            <div className="number">C4765536</div>
          </div>
          <div className="bio">
            <div className="name">Peter Flanagan</div>
            <div className="address yellow">
              New York . NY . USA<br />
              Planet Earth<br />
              Orion Arm . Milky Way
            </div>
            <div className="traits">
              Species: Human . Age: {this.state.age}<br />
              Speed: Moderate <br />
              Strength: Reasonable <br />
              Looks: Adequate
            </div>
            <div className="occupation yellow">pj@pjflanagan.me</div>
          </div>
          <div className="blue-bar">
          </div>
        </div>
        <div className="top-square">
          <div className="top-square-bar"></div>
        </div>
        <div className="bottom-square">
          <div className="bottom-square-white"></div>
        </div>
        <div className="bottom-left-circle-grey"></div>
        <div className="bottom-left-circle-yellow">
          <div className="bottom-left-circle-shine"></div>
        </div>
        <div className="stripes"></div>
      </div>
    );
  }

}

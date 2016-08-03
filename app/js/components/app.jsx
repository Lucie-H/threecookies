import React from 'react';
import AllButtons from './button.jsx';
import Viewer from './viewer.jsx';

const jump = (mesh, frame) => {
  mesh.position.y = 200 + (20 * Math.sin(frame/8));
};

const rotate = (mesh, frame) => {
  mesh.rotation.y -= 0.03;
};

const AIRSHIP = { model: 'airship', meshColor: '0xffffff', animation: jump };
const RUBY = { model: 'ruby', meshColor: '0xac1401', animation: rotate };

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, AIRSHIP);

    this.showShip = this.showShip.bind(this);
    this.showRuby = this.showRuby.bind(this);
  }

  showShip() {
    this.setState(AIRSHIP);
  }

  showRuby( geometry ) {
    this.setState(RUBY);
  }

  render() {
    return (
      <div>
        <AllButtons showShip={this.showShip} showRuby={this.showRuby} />
        <Viewer model={this.state.model} meshColor={this.state.meshColor} key={this.state.model} animation={this.state.animation} />
      </div>
    )
  }
}

export default App;
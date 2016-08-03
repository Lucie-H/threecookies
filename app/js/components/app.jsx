import React from 'react';
import AllButtons from './button.jsx';
import Viewer from './viewer.jsx';
import Camera from './camera.jsx';
import Plane from './plane.jsx';
import Light from './light.jsx';
import ShowRuby from './showRuby.jsx';
import ShowAirship from './ShowAirship.jsx';
import createFragment from 'react-addons-create-fragment';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: 'airship' // default value
    };

    this.showShip = this.showShip.bind(this);
    this.showRuby = this.showRuby.bind(this);
  }

  showShip() {
    this.setState({ model: 'airship' })
  }

  showRuby( geometry ) {
    this.setState({ model: 'ruby' })
  }

  render() {
    return (
      <div>
        <AllButtons showShip={this.showShip} showRuby={this.showRuby} />
        <Viewer model={this.state.model} key={this.state.model} />
      </div>
    )
  }
}

export default App;

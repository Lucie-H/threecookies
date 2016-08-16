import React from 'react';
import AllButtons from './button.jsx';
import Viewer from './viewer.jsx';
import SelectModule from './superSelect.jsx';
import Dropzone from 'react-dropzone';

const jump = (mesh, frame) => {
  mesh.position.y = 200 + (20 * Math.sin(frame/11));
};

const rotate = (mesh, frame) => {
  mesh.rotation.y -= 0.03;
};

const STARTSCREEN = {  model: 'startScreen', classN: 'rubyColor'};
const AIRSHIP = { model: 'airship', meshColor: '0xffffff', animation: jump, path: '../stl/airship.stl', fileName: 'airship.stl', classN: 'airshipColor' };
const RUBY = { model: 'ruby', meshColor: '0xac1401', animation: rotate, path: "../stl/ruby.stl", fileName: 'ruby.stl', classN: 'rubyColor'};
const JAVAS = {model: 'js', meshColor: '0xac1401', animation: rotate, path: "../stl/js.stl", fileName: 'js.stl', classN: 'rubyColor'};

const newMesh = {model: 'newMesh', savedFile: [], fileName: 'ruby.stl', meshColor: '0xac1401', animation: rotate, classN: 'rubyColor'};


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, STARTSCREEN);

    this.showShip = this.showShip.bind(this);
    this.showRuby = this.showRuby.bind(this);
    this.showJS = this.showJS.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  showShip() {
    this.setState(AIRSHIP);
  }

  showRuby() {
    this.setState(RUBY);
  }

  showJS() {
    this.setState(JAVAS);
  }

  onDrop(file) {
    newMesh.savedFile = file;
    this.setState(newMesh);
    }


  /*
  <AllButtons showShip={this.showShip} showRuby={this.showRuby} showJS={this.showJS} path={this.state.path} fileName={this.state.fileName} classN={this.state.classN} />
  */

  render() {
    return (
      <div>
        <Dropzone className="dropzoneClass" multiple={false} onDrop={this.onDrop} disableClick>
          <SelectModule showShip={this.showShip} showRuby={this.showRuby} showJS={this.showJS} classN={this.state.classN} />
          <Viewer newMesh={newMesh} model={this.state.model} meshColor={this.state.meshColor} key={this.state.model} fileName={this.state.fileName} animation={this.state.animation} classN={this.state.classN} />
        </Dropzone>
      </div>
    )
  }
}

export default App;

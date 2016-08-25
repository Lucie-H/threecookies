import React from 'react';
import Viewer from './viewer';
import Selector from './selector';
import Dropzone from 'react-dropzone';
import AllButtons from './button';

let svgRenderer;

const jump = (mesh, frame) => {
  mesh.position.y = 200 + (20 * Math.sin(frame/11));
};

const rotate = (mesh, frame) => {
  mesh.rotation.y -= 0.03;
};

const AIRSHIP = { name: 'airship', key:'airship', geometry: null, meshColor: '0xffffff', animation: jump, path: '../stl/airship.stl', fileName: 'airship.stl', classN: 'airshipColor' };
const RUBY = { name: 'ruby', key:'ruby', geometry: null, meshColor: '0xac1401', animation: rotate, path: "../stl/ruby.stl", fileName: 'ruby.stl', classN: 'rubyColor'};
const JS = {name: 'javascript', key:'javas', geometry: null, meshColor: '0xac1401', animation: rotate, path: "../stl/js.stl", fileName: 'js.stl', classN: 'rubyColor'};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      models: {},
      selected: null
    };
    this.loader = new THREE.STLLoader();

    this.onSelect = this.onSelect.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.loadModel = this.loadModel.bind(this);
    this.renderSVG = this.renderSVG.bind(this);
  }

  onSelect(name) {
    this.setState({selected: name});
  }

  onDrop(files) {
    const file = files[0];
    this.loadModel({file, meshColor: '0xac1401', animation: rotate});
  }

  loadModel(obj) {
    if(typeof obj.file !== 'undefined') {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        const geometry = this.loader.parse(event.target.result);
        const model = Object.assign({}, obj, {geometry});
        const name = `${obj.file.name}-${obj.file.lastModified}`;
        this.setState({selected: name, models: Object.assign({}, this.state.models, {[name]: model})});
      });
      reader.readAsBinaryString(obj.file);
    } else {
      this.loader.load(obj.path, (geometry) => {
        const model = Object.assign({}, obj, {geometry});
        this.setState({models: Object.assign({}, this.state.models, {[obj.name]: model})});
      });
    }
  }

  renderSVG() {
    const svgRenderer = new THREE.SVGRenderer({ antialias: true });
    svgRenderer.setPixelRatio( window.devicePixelRatio );
    svgRenderer.setSize( 100, 100 );
    svgRenderer.setClearColor( 0xffffff );
    return svgRenderer;
  }

  componentDidMount() {
    const arr = [AIRSHIP, RUBY, JS];
    arr.forEach((model) => {
      this.loadModel(model);
    });
  }

  render() {
    const model = this.state.models[this.state.selected] || {};
    return (
      <div>
        <Dropzone className="dropzoneClass" multiple={false} onDrop={this.onDrop} disableClick>
          <AllButtons path={model.path} fileName={model.fileName} selected={this.state.selected}/>
          <Selector svgRenderer={this.renderSVG()} items={this.state.models} selected={this.state.selected} onSelect={this.onSelect} />
          <Viewer geometry={model.geometry} selected={this.state.selected} animation={model.animation} meshColor={model.meshColor} key={this.state.selected} fileName={model.fileName} classN={model.classN} />
        </Dropzone>
      </div>
    )
  }
}

export default App;

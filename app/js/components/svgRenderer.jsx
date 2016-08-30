import React from 'react';
import MakerJs from 'makerjs';

class SvgPreview extends React.Component {

  constructor(props) {
    super(props);

    this.renderSVG = this.renderSVG.bind(this);
    this.scene = this.createScene();
    this.state = {svg: null};
    this.svg = null;
    this.xmls = new XMLSerializer();
    this.camera = new THREE.PerspectiveCamera(40, 1, 1, 1)
    this.camera.position.z = 1000;
  }

  createScene() {
    const scene = new THREE.Scene();
    scene.add( new THREE.HemisphereLight( 0xfefefe, 0x111122, 0.4 ) );
    return scene;
  }

  meshToScene() {
    const material = new THREE.MeshPhongMaterial({ color: 0xac1401, specular: 0xffffff, shininess: 200 });
    const mesh = new THREE.Mesh( this.props.geometry, material );
    mesh.scale.set(3,3,3);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    this.scene.add(mesh);
  }

  renderSVG() {
    this.props.svgRenderer.render( this.scene, this.camera );
    this.svg = this.props.svgRenderer.domElement;
  }
/*
  toIModel() {
    const paths = Array.prototype.slice.call(this.svg.getElementsByTagName('path'), 0, 1);
    const svgPath = paths.reduce(function (pathCommands, path) {
      const d = path.getAttribute('d');
       return pathCommands + d.replace(/\s+/g, ' ');
    }, '');

    console.log(svgPath);
    const iModelObject = MakerJs.importer.fromSVGPathData(svgPath);
    //console.log(iModelObject);

    // the line to break everything:
    console.log(MakerJs.exporter.toSTL(iModelObject, {extrusion: 10}));

  }*/
  /*renderSVG() {
    return new Promise(resolve => {
      const svgRenderer = new THREE.SVGRenderer({ antialias: true });
      svgRenderer.setPixelRatio( window.devicePixelRatio );
      svgRenderer.setSize( 100, 80 );
      svgRenderer.setClearColor( 0xffffff );
      svgRenderer.render( this.scene, this.camera );
      this.svg = svgRenderer.domElement;
      console.log(this.svg);
      resolve(this.svg)
    })
  }

  componentDidMount() {
    this.renderSVG()
      .then((svg) => document.querySelector('#svg').appendChild(svg))
  }

  render() {
    this.meshToScene();

    // refs
    return (
      <span id="svg">
      </span>
    )*/

/*  componentDidUpdate() {
    this.toIModel();
  }*/

  render() {
    this.meshToScene();
    this.renderSVG();
    return (
      <span id="svg" dangerouslySetInnerHTML={{__html: this.xmls.serializeToString(this.svg)}}>
      </span>
    )
  }
}

export default SvgPreview;

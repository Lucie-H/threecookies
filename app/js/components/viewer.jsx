import React from 'react';
import TWEEN from 'tween.js';
import Camera from './camera.jsx';
import Plane from './plane.jsx';
import Particle from '../particle.js';

let renderer;
let svgRenderer;

class Viewer extends React.Component {

  constructor(props) {
    super(props);

    this.canvas = document.createElement( 'canvas' );

    this.renderScene = this.renderScene.bind(this);
    this.resize = this.resize.bind(this);
    this.mountRendererElement = this.mountRendererElement.bind(this);
    this.onGeometryLoaded = this.onGeometryLoaded.bind(this);

    this.scene = this.createScene();
    this.renderer = this.createRenderer();
    this.svgRenderer = this.createSVGRenderer();
    this.xmls = new XMLSerializer();
    this.camera = Camera(window);
    this.req;
    this.frame = 0;
  }

  createScene() {
    const scene = new THREE.Scene();
    scene.add( Plane() );
    scene.add( new THREE.HemisphereLight( 0xfefefe, 0x111122, 0.4 ) );
    scene.fog = new THREE.Fog( 0xefefef, 1, 3500);
    scene.add( this.light() );
    return scene;
  }

  createSVGRenderer() {
    if (typeof svgRenderer === 'undefined') {
      svgRenderer = new THREE.SVGRenderer({ antialias: true });
    }
    svgRenderer.setPixelRatio( window.devicePixelRatio );
    svgRenderer.setSize( window.innerWidth, window.innerHeight );
    svgRenderer.setClearColor( 0x000000 );

    return svgRenderer;
  }

  createRenderer() {
    if (typeof renderer === 'undefined') {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    }

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.setClearColor( 0xefefef );

    return renderer;
  }

  onGeometryLoaded() {
    const material = new THREE.MeshPhongMaterial({ color: parseInt(`${this.props.meshColor}`, 16), specular: 0xffffff, shininess: 200 });
    const mesh = new THREE.Mesh( this.props.geometry, material );
    mesh.scale.set(3,3,3);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    this.scene.add(mesh);
    this.mesh = mesh;
  }

  light() {
    const light = new THREE.DirectionalLight( 0x999999, 0.8 );
    light.position.set(250, 450, 200);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 1500;
    light.shadow.camera.left = -200;
    light.shadow.camera.right = 200;
    light.shadow.camera.top = 300;
    light.shadow.camera.bottom = -200;

    return light;
  }

  resize() {
   this.renderer.setSize(window.innerWidth, window.innerHeight);
   this.camera.aspect = window.innerWidth / window.innerHeight;
   this.camera.updateProjectionMatrix();
  }

  // renderLoop() {
  //   this.req = requestAnimationFrame(this.renderLoop);
  //   this.renderScene();
  // }

  renderScene() {
    this.req = requestAnimationFrame(this.renderScene);

    if(this.props.selected === 'airship') {
      TWEEN.update();
      Particle(this.canvas, this.scene, this.frame, TWEEN, THREE);
    }
    if (this.mesh && this.props.selected != 'startScreen') {
      this.props.animation(this.mesh, this.frame);
      this.frame += 1;
    }
    this.renderer.render( this.scene, this.camera );
  }

  renderControl() {
    const controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    controls.target = new THREE.Vector3(-10, 80, 0);
    controls.enableDamping = true;
    controls.minDistance = 200;
    controls.maxDistance = 3000;
    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = 1.65; // radians
    return controls;
  }

  mountRendererElement() {
    document.getElementById('view').appendChild(this.renderer.domElement);
    this.svgRenderer.render( this.scene, this.camera );
    window.addEventListener('resize', this.resize);
  }

  componentDidMount() {
    if (this.props.geometry) {
      this.onGeometryLoaded();
    }
    this.mountRendererElement();
    this.renderControl();
    this.renderScene();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.req);
    window.removeEventListener('resize', this.resize);
    this.scene.remove(this.mesh);
  }

  render() {
    return (
      <div id='view'>
      </div>
    );
  }
}


export default Viewer;

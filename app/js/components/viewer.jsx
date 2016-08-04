import React from 'react';
import Camera from './camera.jsx';
import Plane from './plane.jsx';

class Viewer extends React.Component {

  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
    this.resize = this.resize.bind(this);

    this.scene = this.createScene();
    this.renderer = this.createRenderer();
    this.camera = Camera(window);

    this.frame = 0;
  }

  createScene() {
    const scene = new THREE.Scene();
    scene.add( Plane() );
    scene.add( new THREE.HemisphereLight( 0xfefefe, 0x111122, 0.4 ) );
    scene.fog = new THREE.Fog( 0xefefef, 1, 3500);
    scene.add( this.night() );
    return scene;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.setClearColor( 0xefefef );
    return renderer;
  }

  loadModel() {
    const loader = new THREE.STLLoader();
    loader.load(`../stl/${this.props.model}.stl`, (geometry) => {
      const material = new THREE.MeshPhongMaterial({ color: parseInt(`${this.props.meshColor}`, 16), specular: 0xffffff, shininess: 200 });
      const mesh = new THREE.Mesh( geometry, material );
      mesh.scale.set(3,3,3);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.mesh = mesh;
    });
  }


  night() {
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

  renderScene() {
    requestAnimationFrame(this.renderScene);
    if (this.mesh) {
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

  componentDidMount() {
    this.loadModel();
    this.renderControl();
    this.renderScene();
    document.getElementById('view').appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.resize);
  }

  componenWillUnmount() {
    // clean up WebGL context and requestAnimationFrame callbacks
  }

  render() {
    return (<div id='view'></div>);
  }
}


export default Viewer;

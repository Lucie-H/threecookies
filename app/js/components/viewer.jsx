import React from 'react';
import Camera from './camera.jsx';
import Plane from './plane.jsx';
import Light from './light.jsx';
import Controls from './controls.jsx';
// import ShowAirship from './ShowAirship.jsx';
import createFragment from 'react-addons-create-fragment';

class Viewer extends React.Component {

  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
    this.resize = this.resize.bind(this);

    this.scene = this.createScene();
    this.renderer = this.createRenderer();

    this.r = 0;
  }

  createScene() {
    const scene = new THREE.Scene();
    scene.add( Plane() );
    scene.add( new THREE.HemisphereLight( 0xfefefe, 0x111122, 0.4 ) );
    scene.fog = new THREE.Fog( 0xefefef, 1, 3500);
    scene.add( Light() );
    return scene;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.setClearColor( 0xefefef );
    return renderer;
  }

  loadModel() {
    const loader = new THREE.STLLoader();
    loader.load(`../stl/${this.props.model}.stl`, ( geometry ) => {
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 200 });
      const mesh = new THREE.Mesh( geometry, material );
      mesh.scale.set(3,3,3);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      mesh.position.y = 100;
      this.scene.add(mesh);
      this.mesh = mesh;
    });
  }

  resize() {
   this.renderer.setSize(window.innerWidth, window.innerHeight);
   Camera(window).aspect = window.innerWidth / window.innerHeight;
   Camera(window).updateProjectionMatrix();
  }

  renderScene () {
   requestAnimationFrame( this.renderScene );

   if (this.mesh) {
    this.mesh.position.y = 200 + (20 * Math.sin(this.r));
    this.r = (this.r + 0.085) % (2 * Math.PI);
   }
   this.renderer.render( this.scene, Camera(window) );
  }

  componentDidMount() {
    this.loadModel();
    this.renderScene();

    document.getElementById('view').appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.resize);
  }



  render() {
    return (
      <div id='view'>
      </div>
    )
  }
}


export default Viewer;

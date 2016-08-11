import React from 'react';
import TWEEN from 'tween.js';
import Camera from './camera.jsx';
import Plane from './plane.jsx';
import Particle from '/Users/Pia/threecookies/threecookies/app/js/particle.js';

let renderer;

class Viewer extends React.Component {

  constructor(props) {
    super(props);

    this.canvas = document.createElement( 'canvas' );

    this.renderScene = this.renderScene.bind(this);
    this.resize = this.resize.bind(this);
    this.mountRendererElement = this.mountRendererElement.bind(this);
  //  this.particles = this.particles.bind(this);

    this.loader = new THREE.STLLoader();
    this.scene = this.createScene();
    this.renderer = this.createRenderer();
    this.camera = Camera(window);
    this.particle = Particle(this.canvas, this.scene);
    this.req;
    this.frame = 0;
    this.itemsToRemove = [];
    this.itemsToRemove.push(this.scene);

  }

  createScene() {
    const scene = new THREE.Scene();
    if(this.props.model === 'ruby') {
      scene.add( Plane() );
    }
    scene.add( new THREE.HemisphereLight( 0xfefefe, 0x111122, 0.4 ) );
    scene.fog = new THREE.Fog( 0xefefef, 1, 3500);
    scene.add( this.light() );
    return scene;
  }

  createRenderer() {
    if (typeof renderer === 'undefined') {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    }

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.setClearColor( 0x000000 );

    if(this.props.model == 'ruby') {
      renderer.setClearColor( 0xefefef );
    }

    return renderer;
  }

  loadModel() {
    this.loader.load(`../stl/${this.props.model}.stl`, (geometry) => {
      const material = new THREE.MeshPhongMaterial({ color: parseInt(`${this.props.meshColor}`, 16), specular: 0xffffff, shininess: 200 });
      const mesh = new THREE.Mesh( geometry, material );
      mesh.scale.set(3,3,3);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.mesh = mesh;
    });
  }

  particles() {
    const material = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture( this.generateSprite() ),
      blending: THREE.AdditiveBlending
    });
    var particle1 = new THREE.Sprite(material);
    var particle2 = new THREE.Sprite(material);
    var particle3 = new THREE.Sprite(material);
    var y1 = 80,
        y2 = -10,
        y3 = 170,
        x1= -250,
        x2 = -200,
        x3= -200;
    this.initParticle(particle1, y1, x1, 100);
    this.initParticle(particle2, y2, x2, 100);
    this.initParticle(particle3, y3, x3, 100);
    this.scene.add(particle1);
    this.scene.add(particle2);
    this.scene.add(particle3);
  }

  generateSprite() {
	  this.canvas.width = 16;
	  this.canvas.height = 16;

		var context = this.canvas.getContext( '2d' );
		var gradient = context.createRadialGradient( this.canvas.width / 2, this.canvas.height / 2, 0, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2 );
		gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
		gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
		gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
		gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

		context.fillStyle = gradient;
		context.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		return this.canvas;

	}


  initParticle(particle, y, x, delay) {
		particle.position.set( x, 80, 0 );
    particle.position.y = y + (20 * Math.sin(this.frame/11));
		particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

		new TWEEN.Tween( particle.position )
			.delay( delay )
			.to( { x: Math.random() * 150 - 700, y: particle.position.y + Math.random() * 150 - 100, z: Math.random() * 1000 - 500 }, 10000 )
			.start()
      .onComplete(() => {
        this.scene.remove(particle);
      });

		new TWEEN.Tween( particle.scale )
			.delay( delay )
			.to( { x: 0.01, y: 0.01 }, 10000 )
			.start();
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

    if(this.props.model === 'airship') {
      TWEEN.update();
      this.particles();
      //Particle(this.canvas, this.scene);

    }
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

  mountRendererElement() {
    document.getElementById('view').appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.resize);
  }

  componentDidMount() {
    this.loadModel();
    this.renderControl();
    this.renderScene();
    this.mountRendererElement();
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

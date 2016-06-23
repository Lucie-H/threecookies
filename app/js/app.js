let scene;
let camera;
let controls;
let renderer;
let geometry;
let material;
let mesh;
let light;
let rotationSpeed = 0.03;

const init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  light = new THREE.DirectionalLight( 0xffffff, 0.8 );
  light.position.set(5, 100, 1000);
  light.angle = (Math.PI / 3);
  light.castShadow = true;

  scene.fog = new THREE.Fog( 0xefefef, 0, 1500);

  scene.add( light );

  let plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 10000, 10000 ),
    new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
  );
  plane.rotation.x = -Math.PI/2;
  plane.position.y = -300;
  scene.add( plane );
  plane.receiveShadow = true;
  scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.setClearColor( 0xefefef );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  document.body.appendChild( renderer.domElement );
  renderer.domElement.addEventListener('mousedown', stopRotation);
  renderer.domElement.addEventListener('mouseup', startRotation);
}

const load = () => {
  const loader = new THREE.STLLoader();
  loader.load('../stl/ruby.stl', (geometry) => {
    material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffff00, shininess: 200 });
    mesh = new THREE.Mesh( geometry, material );
    mesh.scale.set(3,3,3);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    // mesh.rotation.set(0, - Math.PI / 2, 0);
    scene.add( mesh );
  });
}

const stopRotation = () => {
  rotationSpeed = 0;
}

const startRotation = () => {
  setTimeout(() => {
    rotationSpeed = 0.03;
  }, 300);
}

const render = () => {
  requestAnimationFrame( render );
  if (mesh) mesh.rotation.y -= rotationSpeed;

  renderer.render( scene, camera );
}

init();
load();
render();

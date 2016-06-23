let scene, camera, renderer;
let geometry, material, mesh;

const init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  var light = new THREE.DirectionalLight( 0xffffff, 0.8 );
  light.position.set(5, 100, 1000);
  light.angle = (Math.PI / 3);
  light.castShadow = true;

  scene.fog = new THREE.Fog( 0xefefef, 0, 1500);

  scene.add( light );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.setClearColor( 0xefefef );

  document.body.appendChild( renderer.domElement );
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

const render = () => {
  requestAnimationFrame( render );
  mesh.rotation.y += -0.03;
  renderer.render( scene, camera );
}

init();
load();
render();

import React from 'react';

const Camera = (wd) => {

  const camera = new THREE.PerspectiveCamera( 75, wd.innerWidth / wd.innerHeight, 1, 10000 );
  camera.position.z = 1000;
  return camera;

};

export default Camera;

import React from 'react';

const Plane = () => {

  const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 10000, 10000 ),
    new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
  );
  plane.rotation.x = -Math.PI/2;
  plane.position.y = -300;
  plane.receiveShadow = true;

  return plane;
}

export default Plane;

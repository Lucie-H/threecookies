import React from 'react';

const Renderer = () => {

  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.setClearColor( 0xefefef );

  return renderer;
}

export default Renderer;

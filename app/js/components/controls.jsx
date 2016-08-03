import React from 'react';
import Camera from './camera.jsx'

const Controls = () => {

  const controls = new THREE.OrbitControls( Camera(), Viewer.state.renderer.domElement );
  controls.target = new THREE.Vector3(-10, 80, 0);
  controls.minDistance = 200;
  controls.maxDistance = 3000;
  controls.minPolarAngle = 0; // radians
  //problem with maxPolarAngle: whole things jumps a bit when clicked
  controls.maxPolarAngle = 1.65; // radians

  return controls;

}

export default Controls;

import React from 'react';

const Light = () => {

  const light =  new THREE.DirectionalLight( 0xffffff, 0.8 );
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
export default Light;

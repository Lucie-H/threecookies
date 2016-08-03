const wrapper = () => {


  let scene;
  var camera;
  let controls;
  let renderer;
  let geometry;
  let material;
  let meshRuby;
  let meshAirship;
  let light;
  let rotationSpeed = 0.03;
  let helper;
  let zoomFactor = 10;

  ////CHANGED
  var octree;
  var objects = [];
  var objectsSearch = [];
  ////

  const init = () => {
   scene = new THREE.Scene();

   camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
   camera.position.z = 1000;

   light = new THREE.DirectionalLight( 0xffffff, 0.8 );
   light.position.set(250, 450, 200);
   light.target.position.set(0, 0, 0);
   light.castShadow = true;

   light.shadow.camera.near = 10;
   light.shadow.camera.far = 1500;
   light.shadow.camera.left = -200;
   light.shadow.camera.right = 200;
   light.shadow.camera.top = 300;
   light.shadow.camera.bottom = -200;

   scene.fog = new THREE.Fog( 0xefefef, 1, 3500);

   scene.add( light );

   //helper = new THREE.CameraHelper(light.shadow.camera);
   //scene.add(helper);

   initPlane () {
     const plane = new THREE.Mesh(
       new THREE.PlaneBufferGeometry( 10000, 10000 ),
       new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
     );
     plane.rotation.x = -Math.PI/2;
     plane.position.y = -300;
     plane.receiveShadow = true;
     return plane
   }
   const plane = initPlane();
   scene.add( plane );
   scene.add( new THREE.HemisphereLight( 0xfefefe, 0x111122, 0.4 ) );
   renderer = new THREE.WebGLRenderer( { antialias: true } );
   renderer.setPixelRatio( window.devicePixelRatio );
   renderer.setSize( window.innerWidth, window.innerHeight );
   renderer.shadowMap.enabled = true;
   renderer.setClearColor( 0xefefef );

   controls = new THREE.OrbitControls( camera, renderer.domElement );
   document.body.appendChild( renderer.domElement );

   renderer.domElement.addEventListener('mousedown', stopRotation);
   renderer.domElement.addEventListener('mouseup', startRotation);
   renderer.domElement.addEventListener('keypress', night);
   controls.target = new THREE.Vector3(-10, 80, 0);
   controls.minDistance = 200;
   controls.maxDistance = 3000;
   controls.minPolarAngle = 0; // radians
   //problem with maxPolarAngle: whole things jumps a bit when clicked
   controls.maxPolarAngle = 1.65; // radians

   renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
   window.addEventListener('resize', resize);

   /////CHANGED
   octree = new THREE.Octree({
     undeferred: false,
     depthMax: Infinity,
     objectsThreshold: 8,
     overlapPct: 0.15
   });


   /////



  }


  const resize = () => {
   renderer.setSize(window.innerWidth, window.innerHeight);
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
  }

  const stopRotation = () => {
   rotationSpeed = 0;
  }

  const startRotation = () => {
   setTimeout(() => {
     rotationSpeed = 0.03;
   }, 300);
  }

  const night = () => {
    light = new THREE.DirectionalLight( 0x999999, 0.8 );
    light.position.set(250, 450, 200);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;

    light.shadow.camera.near = 10;
    light.shadow.camera.far = 1500;
    light.shadow.camera.left = -200;
    light.shadow.camera.right = 200;
    light.shadow.camera.top = 300;
    light.shadow.camera.bottom = -200;
  }

/////////CHANGES 19.07
  var mouseCoords = new THREE.Vector2(); //vector from camera to mouseCoord
  var raycaster = new THREE.Raycaster();
  var useOctree = true;
  var octreeObjects;
  var intersections;
  var intersected;

  const onMouseMove = event => {
    event.preventDefault();
    mouseCoords.x = (event.clientX / window.innerWidth) * 2 -1;
    mouseCoords.y = - (event.clientY / window.innerHeight) * 2 + 1 ;

    raycaster.setFromCamera( mouseCoords, camera );
    if(useOctree) {
      octreeObjects = octree.search( raycaster.ray.origin, raycaster.ray.far, true, raycaster.ray.direction );
      console.log(raycaster.ray.direction);
      //var origin = new THREE.Vector3().copy( camera.position );
      //var direction = new THREE.Vector2().copy( mouseCoords.sub( camera.position ) ).normalize();
      //octreeObjects = octree.search ( origin, direction );

      intersections = raycaster.intersectOctreeObjects( octreeObjects );
    } else {
      intersections = raycaster.intersectObjects( objects );
    }
    console.log(intersections);

    if(intersections.length>0) {
      if(intersected != intersections[0].object) {
        intersected = intersections[0].object;
        intersected.material.color.setHex( 0xFF69B4 );
      }
      document.body.style.cursor = 'pointer';
    } else if(intersected) {
      intersected = null;
      document.body.style.cursor = 'auto';
    }

  }

//////////
  let r = 0;

  const render = () => {
   requestAnimationFrame( render );

   if (meshAirship) {
     meshAirship.position.y = 200 + (20 * Math.sin(r));
     //to avoid integer max
     r = (r + 0.085) % (2 * Math.PI);
   }
   if (meshRuby) {
     meshRuby.rotation.y -= rotationSpeed;
   }

   renderer.render( scene, camera );
  }

  //window.addEventListener('mousemove', onMouseMove, false); //Changed 19.07.

  let buttonJS;
  const buttonAirshipFunc = () => {
    var divButton = {
      type: 'div',
      id: 'divJSButton'
    }
    let renderButton = settingButtonAttr(divButton);
    document.getElementById('addButton').appendChild(renderButton);

    buttonJS = document.createElement('input');
    buttonJS.type = 'button';
    buttonJS.id = 'airshipButton';
    buttonJS.className = 'jsButton';
    buttonJS.value = 'Airship';

    document.getElementById('divJSButton').appendChild(buttonJS);
    //document.getElementById('jsButton').disbabled = 'false';

    //if(document.getElementById('jsButton').disbabled === 'false') {
    //buttonJS.onclick = loaderAirship.bind;
      document.getElementById('airshipButton').onclick = function() {
        const loaderAirship = new THREE.STLLoader();
        loaderAirship.load('../stl/airship.stl', (geometry) => {
          scene.remove(meshRuby);
          scene.remove(meshAirship);
          material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 200 });
          meshAirship = new THREE.Mesh( geometry, material );
          meshAirship.scale.set(3,3,3);
          meshAirship.receiveShadow = true;
          meshAirship.castShadow = true;
          meshAirship.position.y = 2000;
          // mesh.rotation.set(0, - Math.PI / 2, 0);
          //scene.remove(meshRuby);

          //octree.add( meshAirship );

          scene.add( meshAirship );
          //store object changed 20.07
          objects.push( meshAirship );

          //document.getElementById('jsButton').disbabled = 'true';

        });
      }
    //}
  }


  let buttonRuby;
  const buttonRubyFunc = () => {
    var divButton = {
      type: 'div',
      id: 'divRubyButton'
    }
    let renderButton = settingButtonAttr(divButton);
    document.getElementById('addButton').appendChild(renderButton);

    buttonRuby = document.createElement('input');
    buttonRuby.type = 'button';
    buttonRuby.id = 'rubyButton';
    buttonRuby.className = 'rubyButton';
    buttonRuby.value = 'Ruby';

    document.getElementById('divRubyButton').appendChild(buttonRuby);

    //buttonJS.onclick = loaderAirship.bind;
    document.getElementById('divRubyButton').onclick = function() {
      const loaderRuby = new THREE.STLLoader();
      loaderRuby.load('../stl/ruby.stl', (geometry) => {
        scene.remove(meshRuby);
        scene.remove(meshAirship);
        material = new THREE.MeshPhongMaterial({ color: 0xac1401, specular: 0xffffff, shininess: 200 });
        meshRuby = new THREE.Mesh( geometry, material );
        meshRuby.scale.set(3,3,3);
        meshRuby.receiveShadow = true;
        meshRuby.castShadow = true;
        // mesh.rotation.set(0, - Math.PI / 2, 0);
        //scene.remove(meshRuby);
        octree.add( meshRuby );
        scene.add( meshRuby );
        objects.push( meshRuby );
      });
    }
  }




  const load = () => {
   const loader = new THREE.STLLoader();
   loader.load('../stl/ruby.stl', (geometry) => {
     material = new THREE.MeshPhongMaterial({ color: 0xac1401, specular: 0xffffff, shininess: 200 });
     meshRuby = new THREE.Mesh( geometry, material );
     meshRuby.scale.set(3,3,3);
     meshRuby.position.set(3,3,3);
     meshRuby.receiveShadow = true;
     meshRuby.castShadow = true;
     // mesh.rotation.set(0, - Math.PI / 2, 0);
     //octree.add( meshRuby );
     scene.add( meshRuby );
     //objects.push( meshRuby );

   });
 }



  const settingButtonAttr = element => {
    var container = document.createElement(element.type);

    if(element.value) {
      container.value = element.value;
    }
    if(element.className) {
      container.className = element.className;
    }
    if(element.id) {
      container.id = element.id;
    }
    return container;
  }

  init();
  load();
  render();
  buttonAirshipFunc();
  buttonRubyFunc();
}

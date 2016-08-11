const Particle = (canvas, scene, frame, TWEEN, THREE) => {

  const particles = () => {
    const material = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture( generateSprite() ),
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
    initParticle(particle1, y1, x1, 100);
    initParticle(particle2, y2, x2, 100);
    initParticle(particle3, y3, x3, 100);
    scene.add(particle1);
    scene.add(particle2);
    scene.add(particle3);
  }

  const generateSprite = () => {
	  canvas.width = 16;
	  canvas.height = 16;

		var context = canvas.getContext( '2d' );
		var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
		gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
		gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
		gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
		gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

		context.fillStyle = gradient;
		context.fillRect( 0, 0, canvas.width, canvas.height );

		return canvas;

	}

  const initParticle = (particle, y, x, delay) => {
		particle.position.set( x, 80, 0 );
    particle.position.y = y + (20 * Math.sin(frame/11));
		particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

		new TWEEN.Tween( particle.position )
			.delay( delay )
			.to( { x: Math.random() * 150 - 700, y: particle.position.y + Math.random() * 150 - 100, z: Math.random() * 1000 - 500 }, 10000 )
			.start()
      .onComplete(() => {
        scene.remove(particle);
      });

		new TWEEN.Tween( particle.scale )
			.delay( delay )
			.to( { x: 0.01, y: 0.01 }, 10000 )
			.start();
	}
  return particles();
}
export default Particle;

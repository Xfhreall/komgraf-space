import { settings } from './constants.js';

export function animatePlanets(planets, sun) {
  sun.rotateY(0.001 * settings.Rotasi);
  
  planets.mercury.planet.rotateY(0.001 * settings.Rotasi);
  planets.mercury.planet3d.rotateY(0.004 * settings.Revolusi);
  
  planets.venus.planet.rotateY(0.0005 * settings.Rotasi)
  planets.venus.Atmosphere.rotateY(0.0005 * settings.Rotasi);
  planets.venus.planet3d.rotateY(0.0006 * settings.Revolusi);
  
  planets.earth.planet.rotateY(0.005 * settings.Rotasi);
  planets.earth.Atmosphere.rotateY(0.001 * settings.Rotasi);
  planets.earth.planet3d.rotateY(0.001 * settings.Revolusi);
  
  planets.mars.planet.rotateY(0.01 * settings.Rotasi);
  planets.mars.planet3d.rotateY(0.0007 * settings.Revolusi);
  
  planets.jupiter.planet.rotateY(0.005 * settings.Rotasi);
  planets.jupiter.planet3d.rotateY(0.0003 * settings.Revolusi);
  
  planets.saturn.planet.rotateY(0.01 * settings.Rotasi);
  planets.saturn.planet3d.rotateY(0.0002 * settings.Revolusi);
  
  planets.uranus.planet.rotateY(0.005 * settings.Rotasi);
  planets.uranus.planet3d.rotateY(0.0001 * settings.Revolusi);
  
  planets.neptune.planet.rotateY(0.005 * settings.Rotasi);
  planets.neptune.planet3d.rotateY(0.00008 * settings.Revolusi);
}

export function animateMoons(planets, marsMoons) {
  if (planets.earth.moons) {
    planets.earth.moons.forEach(moon => {
      const time = performance.now();
      const tiltAngle = 5 * Math.PI / 180;

      const moonX = planets.earth.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed);
      const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed) * Math.sin(tiltAngle);
      const moonZ = planets.earth.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed) * Math.cos(tiltAngle);

      moon.mesh.position.set(moonX, moonY, moonZ);
      moon.mesh.rotateY(0.01);
    });
  }

  if (marsMoons){
    marsMoons.forEach(moon => {
      if (moon.mesh) {
        const time = performance.now();

        const moonX = planets.mars.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed);
        const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed);
        const moonZ = planets.mars.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed);

        moon.mesh.position.set(moonX, moonY, moonZ);
        moon.mesh.rotateY(0.001);
      }
    });
  }

  if (planets.jupiter.moons) {
    planets.jupiter.moons.forEach(moon => {
      const time = performance.now();
      const moonX = planets.jupiter.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed);
      const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed);
      const moonZ = planets.jupiter.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed);

      moon.mesh.position.set(moonX, moonY, moonZ);
      moon.mesh.rotateY(0.01);
    });
  }
}

export function animateAsteroids(asteroids) {
  asteroids.forEach(asteroid => {
    asteroid.rotation.y += 0.0001;
    asteroid.position.x = asteroid.position.x * Math.cos(0.0001 * settings.Revolusi) + asteroid.position.z * Math.sin(0.0001 * settings.Revolusi);
    asteroid.position.z = asteroid.position.z * Math.cos(0.0001 * settings.Revolusi) - asteroid.position.x * Math.sin(0.0001 * settings.Revolusi);
  });
}

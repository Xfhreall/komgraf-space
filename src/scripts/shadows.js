export function setupShadows(renderer, pointLight, planets) {
  renderer.shadowMap.enabled = true;
  pointLight.castShadow = true;

  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 10;
  pointLight.shadow.camera.far = 20;

  planets.earth.planet.castShadow = true;
  planets.earth.planet.receiveShadow = true;
  planets.earth.Atmosphere.castShadow = true;
  planets.earth.Atmosphere.receiveShadow = true;
  planets.earth.moons.forEach(moon => {
    moon.mesh.castShadow = true;
    moon.mesh.receiveShadow = true;
  });
  
  planets.mercury.planet.castShadow = true;
  planets.mercury.planet.receiveShadow = true;
  
  planets.venus.planet.castShadow = true;
  planets.venus.planet.receiveShadow = true;
  planets.venus.Atmosphere.receiveShadow = true;
  
  planets.mars.planet.castShadow = true;
  planets.mars.planet.receiveShadow = true;
  
  planets.jupiter.planet.castShadow = true;
  planets.jupiter.planet.receiveShadow = true;
  planets.jupiter.moons.forEach(moon => {
    moon.mesh.castShadow = true;
    moon.mesh.receiveShadow = true;
  });
  
  planets.saturn.planet.castShadow = true;
  planets.saturn.planet.receiveShadow = true;
  planets.saturn.Ring.receiveShadow = true;
  
  planets.uranus.planet.receiveShadow = true;
  planets.neptune.planet.receiveShadow = true;
}

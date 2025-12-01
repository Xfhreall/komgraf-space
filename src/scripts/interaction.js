import * as THREE from 'three';

export function setupInteraction(camera, raycastTargets, planets, settings, controls, showPlanetInfo, closeInfoNoZoomOut) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  let selectedPlanet = null;
  let isMovingTowardsPlanet = false;
  let targetCameraPosition = new THREE.Vector3();
  let offset;

  function onMouseMove(event) {
    // event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }

  function identifyPlanet(clickedObject) {
    if (clickedObject.material === planets.mercury.planet.material) {
      offset = 10;
      return planets.mercury;
    } else if (clickedObject.material === planets.venus.Atmosphere.material) {
      offset = 25;
      return planets.venus;
    } else if (clickedObject.material === planets.earth.Atmosphere.material) {
      offset = 25;
      return planets.earth;
    } else if (clickedObject.material === planets.mars.planet.material) {
      offset = 15;
      return planets.mars;
    } else if (clickedObject.material === planets.jupiter.planet.material) {
      offset = 50;
      return planets.jupiter;
    } else if (clickedObject.material === planets.saturn.planet.material) {
      offset = 50;
      return planets.saturn;
    } else if (clickedObject.material === planets.uranus.planet.material) {
      offset = 25;
      return planets.uranus;
    } else if (clickedObject.material === planets.neptune.planet.material) {
      offset = 20;
      return planets.neptune;
    }
    return null;
  }

  function onDocumentMouseDown(event) {
    // Only handle clicks on the canvas
    if (event.target.tagName !== 'CANVAS') return;
    
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(raycastTargets);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      selectedPlanet = identifyPlanet(clickedObject);
      if (selectedPlanet) {
        closeInfoNoZoomOut(settings);
        
        settings.Revolusi = 0;

        const planetPosition = new THREE.Vector3();
        selectedPlanet.planet.getWorldPosition(planetPosition);
        controls.target.copy(planetPosition);
        camera.lookAt(planetPosition);

        targetCameraPosition.copy(planetPosition).add(camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset));
        isMovingTowardsPlanet = true;
      }
    }
  }

  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mousedown', onDocumentMouseDown, false);

  return {
    raycaster,
    mouse,
    getSelectedPlanet: () => selectedPlanet,
    isMovingTowardsPlanet: () => isMovingTowardsPlanet,
    setIsMovingTowardsPlanet: (value) => { isMovingTowardsPlanet = value; },
    getTargetCameraPosition: () => targetCameraPosition
  };
}

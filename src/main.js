import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

import bgTexture1 from './images/1.jpg';
import bgTexture2 from './images/2.jpg';
import bgTexture3 from './images/3.jpg';
import bgTexture4 from './images/4.jpg';
import sunTexture from './images/sun.jpg';
import mercuryTexture from './images/mercurymap.jpg';
import mercuryBump from './images/mercurybump.jpg';
import venusTexture from './images/venusmap.jpg';
import venusBump from './images/venusmap.jpg';
import venusAtmosphere from './images/venus_atmosphere.jpg';
import earthTexture from './images/earth_daymap.jpg';
import earthNightTexture from './images/earth_nightmap.jpg';
import earthAtmosphere from './images/earth_atmosphere.jpg';
import earthMoonTexture from './images/moonmap.jpg';
import earthMoonBump from './images/moonbump.jpg';
import marsTexture from './images/marsmap.jpg';
import marsBump from './images/marsbump.jpg';
import jupiterTexture from './images/jupiter.jpg';
import ioTexture from './images/jupiterIo.jpg';
import europaTexture from './images/jupiterEuropa.jpg';
import ganymedeTexture from './images/jupiterGanymede.jpg';
import callistoTexture from './images/jupiterCallisto.jpg';
import saturnTexture from './images/saturnmap.jpg';
import satRingTexture from './images/saturn_ring.png';
import uranusTexture from './images/uranus.jpg';
import uraRingTexture from './images/uranus_ring.png';
import neptuneTexture from './images/neptune.jpg';

import { settings } from './scripts/constants.js';
import { createPlanet } from './scripts/planetFactory.js';
import { loadObject, loadAsteroids, asteroids } from './scripts/loaders.js';
import { showPlanetInfo, closeInfo, closeInfoNoZoomOut, switchTab } from './scripts/ui.js';
import { setupInteraction } from './scripts/interaction.js';
import { animatePlanets, animateMoons, animateAsteroids } from './scripts/animation.js';
import { setupShadows } from './scripts/shadows.js';

const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(-175, 115, 5);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.75;
controls.screenSpacePanning = false;

const cubeTextureLoader = new THREE.CubeTextureLoader();
const loadTexture = new THREE.TextureLoader();

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 3;
outlinePass.edgeGlow = 1;
outlinePass.visibleEdgeColor.set(0xffffff);
outlinePass.hiddenEdgeColor.set(0x190a05);
composer.addPass(outlinePass);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.4, 0.85);
bloomPass.threshold = 1;
bloomPass.radius = 0.9;
composer.addPass(bloomPass);

var lightAmbient = new THREE.AmbientLight(0x222222, 6); 
scene.add(lightAmbient);

scene.background = cubeTextureLoader.load([
  bgTexture3,
  bgTexture1,
  bgTexture2,
  bgTexture2,
  bgTexture4,
  bgTexture2
]);

const revolusiInput = document.getElementById('revolusi');
const revolusiVal = document.getElementById('revolusi-val');
const rotasiInput = document.getElementById('rotasi');
const rotasiVal = document.getElementById('rotasi-val');
const cahayaInput = document.getElementById('cahaya');
const cahayaVal = document.getElementById('cahaya-val');
const controlPanel = document.getElementById('custom-controls');
const closeControlsBtn = document.getElementById('close-controls');
const showControlsBtn = document.getElementById('show-controls');

revolusiInput.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    settings.Revolusi = value;
    revolusiVal.textContent = value;
});

rotasiInput.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    settings.Rotasi = value;
    rotasiVal.textContent = value;
});

cahayaInput.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    settings.CahayaMatahari = value;
    cahayaVal.textContent = value;
    if(sunMat) sunMat.emissiveIntensity = value;
});

closeControlsBtn.addEventListener('click', () => {
    controlPanel.classList.add('minimized');
});

showControlsBtn.addEventListener('click', () => {
    controlPanel.classList.remove('minimized');
});

// Prevent OrbitControls from interfering with custom controls
['mousedown', 'touchstart', 'pointerdown'].forEach(event => {
    controlPanel.addEventListener(event, (e) => {
        e.stopPropagation();
    });
});

const disclaimerModal = document.getElementById('disclaimer-modal');
const tutorialModal = document.getElementById('tutorial-modal');
const closeDisclaimerBtn = document.getElementById('close-disclaimer');
const closeTutorialBtn = document.getElementById('close-tutorial');

closeDisclaimerBtn.addEventListener('click', () => {
    disclaimerModal.classList.add('hidden');
    setTimeout(() => {
        disclaimerModal.style.display = 'none';
        tutorialModal.classList.remove('hidden');
    }, 500);
});

closeTutorialBtn.addEventListener('click', () => {
    tutorialModal.classList.add('hidden');
    setTimeout(() => {
        tutorialModal.style.display = 'none';
    }, 500);
});

let isZoomingOut = false;
let zoomOutTargetPosition = new THREE.Vector3(-175, 115, 5);

window.closeInfo = () => {
  const result = closeInfo(settings, controls);
  isZoomingOut = result.isZoomingOut;
};
window.switchTab = switchTab;

let sunMat;
const sunSize = 697/40;
const sunGeom = new THREE.SphereGeometry(sunSize, 32, 20);
sunMat = new THREE.MeshStandardMaterial({
  emissive: 0xFFF88F,
  emissiveMap: loadTexture.load(sunTexture),
  emissiveIntensity: settings.CahayaMatahari
});
const sun = new THREE.Mesh(sunGeom, sunMat);
scene.add(sun);

const pointLight = new THREE.PointLight(0xFDFFD3 , 1200, 400, 1.4);
scene.add(pointLight);

const earthMaterial = new THREE.ShaderMaterial({
  uniforms: {
    dayTexture: { type: "t", value: loadTexture.load(earthTexture) },
    nightTexture: { type: "t", value: loadTexture.load(earthNightTexture) },
    sunPosition: { type: "v3", value: sun.position }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vSunDirection;
    uniform vec3 sunPosition;

    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
      vSunDirection = normalize(sunPosition - worldPosition.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vSunDirection;

    void main() {
      float intensity = max(dot(vNormal, vSunDirection), 0.0);
      vec4 dayColor = texture2D(dayTexture, vUv);
      vec4 nightColor = texture2D(nightTexture, vUv)* 0.2;
      gl_FragColor = mix(nightColor, dayColor, intensity);
    }
  `
});

const earthMoon = [{
  size: 1.6,
  texture: earthMoonTexture,
  bump: earthMoonBump,
  orbitSpeed: 0.001 * settings.Revolusi,
  orbitRadius: 10
}]

const marsMoons = [
  {
    modelPath: '/images/mars/phobos.glb',
    scale: 0.1,
    orbitRadius: 5,
    orbitSpeed: 0.002 * settings.Revolusi,
    position: 100,
    mesh: null
  },
  {
    modelPath: '/images/mars/deimos.glb',
    scale: 0.1,
    orbitRadius: 9,
    orbitSpeed: 0.0005 * settings.Revolusi,
    position: 120,
    mesh: null
  }
];

const jupiterMoons = [
  {
    size: 1.6,
    texture: ioTexture,
    orbitRadius: 20,
    orbitSpeed: 0.0005 * settings.Revolusi
  },
  {
    size: 1.4,
    texture: europaTexture,
    orbitRadius: 24,
    orbitSpeed: 0.00025 * settings.Revolusi
  },
  {
    size: 2,
    texture: ganymedeTexture,
    orbitRadius: 28,
    orbitSpeed: 0.000125 * settings.Revolusi
  },
  {
    size: 1.7,
    texture: callistoTexture,
    orbitRadius: 32,
    orbitSpeed: 0.00006 * settings.Revolusi
  }
];

const mercury = createPlanet('Mercury', 2.4, 40, 0, mercuryTexture, mercuryBump, null, null, null, loadTexture, scene);
const venus = createPlanet('Venus', 6.1, 65, 3, venusTexture, venusBump, null, venusAtmosphere, null, loadTexture, scene);
const earth = createPlanet('Earth', 6.4, 90, 23, earthMaterial, null, null, earthAtmosphere, earthMoon, loadTexture, scene);
const mars = createPlanet('Mars', 3.4, 115, 25, marsTexture, marsBump, null, null, null, loadTexture, scene);

marsMoons.forEach(moon => {
  loadObject(moon.modelPath, moon.position, moon.scale, function(loadedModel) {
    moon.mesh = loadedModel;
    mars.planetSystem.add(moon.mesh);
    moon.mesh.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, scene);
});

const jupiter = createPlanet('Jupiter', 69/4, 200, 3, jupiterTexture, null, null, null, jupiterMoons, loadTexture, scene);
const saturn = createPlanet('Saturn', 58/4, 270, 26, saturnTexture, null, {
  innerRadius: 18, 
  outerRadius: 29, 
  texture: satRingTexture
}, null, null, loadTexture, scene);
const uranus = createPlanet('Uranus', 25/4, 320, 82, uranusTexture, null, {
  innerRadius: 6, 
  outerRadius: 8, 
  texture: uraRingTexture
}, null, null, loadTexture, scene);
const neptune = createPlanet('Neptune', 24/4, 340, 28, neptuneTexture, null, null, null, null, loadTexture, scene);

const planets = { mercury, venus, earth, mars, jupiter, saturn, uranus, neptune };

const raycastTargets = [
  mercury.planet, venus.planet, venus.Atmosphere, earth.planet, earth.Atmosphere,
  mars.planet, jupiter.planet, saturn.planet, uranus.planet, neptune.planet
];

setupShadows(renderer, pointLight, planets);

const interaction = setupInteraction(camera, raycastTargets, planets, settings, controls, showPlanetInfo, closeInfoNoZoomOut);

function animate(){
  animatePlanets(planets, sun);
  animateMoons(planets, marsMoons);
  animateAsteroids(asteroids);

  interaction.raycaster.setFromCamera(interaction.mouse, camera);
  var intersects = interaction.raycaster.intersectObjects(raycastTargets);
  outlinePass.selectedObjects = [];

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    if (intersectedObject === earth.Atmosphere) {
      outlinePass.selectedObjects = [earth.planet];
    } else if (intersectedObject === venus.Atmosphere) {
      outlinePass.selectedObjects = [venus.planet];
    } else {
      outlinePass.selectedObjects = [intersectedObject];
    }
  }

  if (interaction.isMovingTowardsPlanet()) {
    camera.position.lerp(interaction.getTargetCameraPosition(), 0.03);
    if (camera.position.distanceTo(interaction.getTargetCameraPosition()) < 1) {
      interaction.setIsMovingTowardsPlanet(false);
      showPlanetInfo(interaction.getSelectedPlanet().name);
    }
  } else if (isZoomingOut) {
    camera.position.lerp(zoomOutTargetPosition, 0.05);
    if (camera.position.distanceTo(zoomOutTargetPosition) < 1) {
      isZoomingOut = false;
    }
  }

  controls.update();
  requestAnimationFrame(animate);
  composer.render();
}

loadAsteroids('/asteroids/asteroidPack.glb', 1000, 130, 160, scene);
loadAsteroids('/asteroids/asteroidPack.glb', 3000, 352, 370, scene);
animate();

window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  composer.setSize(window.innerWidth,window.innerHeight);
});

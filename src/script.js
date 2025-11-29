import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

import bgTexture1 from '/images/1.jpg';
import bgTexture2 from '/images/2.jpg';
import bgTexture3 from '/images/3.jpg';
import bgTexture4 from '/images/4.jpg';
import sunTexture from '/images/sun.jpg';
import mercuryTexture from '/images/mercurymap.jpg';
import mercuryBump from '/images/mercurybump.jpg';
import venusTexture from '/images/venusmap.jpg';
import venusBump from '/images/venusmap.jpg';
import venusAtmosphere from '/images/venus_atmosphere.jpg';
import earthTexture from '/images/earth_daymap.jpg';
import earthNightTexture from '/images/earth_nightmap.jpg';
import earthAtmosphere from '/images/earth_atmosphere.jpg';
import earthMoonTexture from '/images/moonmap.jpg';
import earthMoonBump from '/images/moonbump.jpg';
import marsTexture from '/images/marsmap.jpg';
import marsBump from '/images/marsbump.jpg';
import jupiterTexture from '/images/jupiter.jpg';
import ioTexture from '/images/jupiterIo.jpg';
import europaTexture from '/images/jupiterEuropa.jpg';
import ganymedeTexture from '/images/jupiterGanymede.jpg';
import callistoTexture from '/images/jupiterCallisto.jpg';
import saturnTexture from '/images/saturnmap.jpg';
import satRingTexture from '/images/saturn_ring.png';
import uranusTexture from '/images/uranus.jpg';
import uraRingTexture from '/images/uranus_ring.png';
import neptuneTexture from '/images/neptune.jpg';

//  SETUP 
console.log("Create the scene");
const scene = new THREE.Scene();

console.log("Create a perspective projection camera");
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(-175, 115, 5);

console.log("Create the renderer");
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

console.log("Create an orbit control");
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.75;
controls.screenSpacePanning = false;

console.log("Set up texture loader");
const cubeTextureLoader = new THREE.CubeTextureLoader();
const loadTexture = new THREE.TextureLoader();

//  POSTPROCESSING setup
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

//  OUTLINE PASS 
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 3;
outlinePass.edgeGlow = 1;
outlinePass.visibleEdgeColor.set(0xffffff);
outlinePass.hiddenEdgeColor.set(0x190a05);
composer.addPass(outlinePass);

//  BLOOM PASS 
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.4, 0.85);
bloomPass.threshold = 1;
bloomPass.radius = 0.9;
composer.addPass(bloomPass);

// AMBIENT LIGHT
var lightAmbient = new THREE.AmbientLight(0x222222, 6); 
scene.add(lightAmbient);

//  Star background 
scene.background = cubeTextureLoader.load([
  bgTexture3,
  bgTexture1,
  bgTexture2,
  bgTexture2,
  bgTexture4,
  bgTexture2
]);

//  CONTROLS 
const gui = new dat.GUI({ autoPlace: true, width: 300 , hideable: true, closeOnTop: true});
const customContainer = document.getElementById('gui-container');
customContainer.appendChild(gui.domElement);

// SETTINGS FOR INTERACTIVE CONTROLS 
const settings = {
  Revolusi: 1,
  Rotasi: 1,
  CahayaMatahari: 1.9
};

gui.add(settings, 'Revolusi', 0, 10).onChange(value => {
});
gui.add(settings, 'Rotasi', 0, 10).onChange(value => {
});
gui.add(settings, 'CahayaMatahari', 1, 10).onChange(value => {
  sunMat.emissiveIntensity = value;
});

// mouse movement
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

let selectedPlanet = null;
let isMovingTowardsPlanet = false;
let targetCameraPosition = new THREE.Vector3();
let offset;

function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(raycastTargets);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    selectedPlanet = identifyPlanet(clickedObject);
    if (selectedPlanet) {
      closeInfoNoZoomOut();
      
      settings.Revolusi = 0; // Stop orbital movement

      // Update camera to look at the selected planet
      const planetPosition = new THREE.Vector3();
      selectedPlanet.planet.getWorldPosition(planetPosition);
      controls.target.copy(planetPosition);
      camera.lookAt(planetPosition); // Orient the camera towards the planet

      targetCameraPosition.copy(planetPosition).add(camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset));
      isMovingTowardsPlanet = true;
    }
  }
}

function identifyPlanet(clickedObject) {
  // Logic to identify which planet was clicked based on the clicked object, different offset for camera distance
        if (clickedObject.material === mercury.planet.material) {
          offset = 10;
          return mercury;
        } else if (clickedObject.material === venus.Atmosphere.material) {
          offset = 25;
          return venus;
        } else if (clickedObject.material === earth.Atmosphere.material) {
          offset = 25;
          return earth;
        } else if (clickedObject.material === mars.planet.material) {
          offset = 15;
          return mars;
        } else if (clickedObject.material === jupiter.planet.material) {
          offset = 50;
          return jupiter;
        } else if (clickedObject.material === saturn.planet.material) {
          offset = 50;
          return saturn;
        } else if (clickedObject.material === uranus.planet.material) {
          offset = 25;
          return uranus;
        } else if (clickedObject.material === neptune.planet.material) {
          offset = 20;
          return neptune;
        }

  return null;
}

//  SHOW PLANET INFO AFTER SELECTION 
function showPlanetInfo(planet) {
  var info = document.getElementById('planetInfo');
  var name = document.getElementById('planetName');
  var details = document.getElementById('planetDetails');
  var satelliteDetails = document.getElementById('satelliteDetails');

  name.innerText = planet;
  details.innerText = `Radius: ${planetData[planet].radius}\nTilt: ${planetData[planet].tilt}\nRotation: ${planetData[planet].rotation}\nOrbit: ${planetData[planet].orbit}\nDistance: ${planetData[planet].distance}\nMoons: ${planetData[planet].moons}\nInfo: ${planetData[planet].info}`;

  // Display satellite information
  const satellites = satelliteData[planet];
  if (satellites && satellites.length > 0) {
    let satelliteHTML = '';
    satellites.forEach(satellite => {
      satelliteHTML += `
        <div class="satellite-item">
          <h3>${satellite.name}</h3>
          <p><strong>Radius:</strong> ${satellite.radius}</p>
          <p><strong>Jarak:</strong> ${satellite.distance}</p>
          <p><strong>Orbit:</strong> ${satellite.orbit}</p>
          <p><strong>Info:</strong> ${satellite.info}</p>
        </div>
      `;
    });
    satelliteDetails.innerHTML = satelliteHTML;
  } else {
    satelliteDetails.innerHTML = '<p class="no-satellites">Planet ini tidak memiliki satelit alami.</p>';
  }

  info.style.display = 'block';
}
let isZoomingOut = false;
let zoomOutTargetPosition = new THREE.Vector3(-175, 115, 5);
// close 'x' button function
function closeInfo() {
  var info = document.getElementById('planetInfo');
  info.style.display = 'none';
  settings.Revolusi = 1;
  isZoomingOut = true;
  controls.target.set(0, 0, 0);
  
  // Reset to planet tab
  resetTabs();
}
window.closeInfo = closeInfo;
// close info when clicking another planet
function closeInfoNoZoomOut() {
  var info = document.getElementById('planetInfo');
  info.style.display = 'none';
  settings.Revolusi = 1;
  
  // Reset to planet tab
  resetTabs();
}

// Reset tabs to default (Planet tab)
function resetTabs() {
  const tabContents = document.getElementsByClassName('tab-content');
  const tabButtons = document.getElementsByClassName('tab-button');
  
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }
  
  document.getElementById('planetTab').classList.add('active');
  tabButtons[0].classList.add('active');
}
//  SUN 
let sunMat;

const sunSize = 697/40; // 40 times smaller scale than earth
const sunGeom = new THREE.SphereGeometry(sunSize, 32, 20);
sunMat = new THREE.MeshStandardMaterial({
  emissive: 0xFFF88F,
  emissiveMap: loadTexture.load(sunTexture),
  emissiveIntensity: settings.CahayaMatahari
});
const sun = new THREE.Mesh(sunGeom, sunMat);
scene.add(sun);

//point light in the sun
const pointLight = new THREE.PointLight(0xFDFFD3 , 1200, 400, 1.4);
scene.add(pointLight);


//  PLANET CREATION FUNCTION 
function createPlanet(planetName, size, position, tilt, texture, bump, ring, atmosphere, moons){

  let material;
  if (texture instanceof THREE.Material){
    material = texture;
  } 
  else if(bump){
    material = new THREE.MeshPhongMaterial({
    map: loadTexture.load(texture),
    bumpMap: loadTexture.load(bump),
    bumpScale: 0.7
    });
  }
  else {
    material = new THREE.MeshPhongMaterial({
    map: loadTexture.load(texture)
    });
  } 

  const name = planetName;
  const geometry = new THREE.SphereGeometry(size, 32, 20);
  const planet = new THREE.Mesh(geometry, material);
  const planet3d = new THREE.Object3D;
  const planetSystem = new THREE.Group();
  planetSystem.add(planet);
  let Atmosphere;
  let Ring;
  planet.position.x = position;
  planet.rotation.z = tilt * Math.PI / 180;

  // add orbit path
  const orbitPath = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    position, position, // xRadius, yRadius
    0, 2 * Math.PI,   // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
);

  const pathPoints = orbitPath.getPoints(100);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.03 });
  const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  planetSystem.add(orbit);

  //add ring
  if(ring)
  {
    const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius,30);
    const RingMat = new THREE.MeshStandardMaterial({
      map: loadTexture.load(ring.texture),
      side: THREE.DoubleSide
    });
    Ring = new THREE.Mesh(RingGeo, RingMat);
    planetSystem.add(Ring);
    Ring.position.x = position;
    Ring.rotation.x = -0.5 *Math.PI;
    Ring.rotation.y = -tilt * Math.PI / 180;
  }
  
  //add atmosphere
  if(atmosphere){
    const atmosphereGeom = new THREE.SphereGeometry(size+0.1, 32, 20);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      map:loadTexture.load(atmosphere),
      transparent: true,
      opacity: 0.4,
      depthTest: true,
      depthWrite: false
    })
    Atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMaterial)
    
    Atmosphere.rotation.z = 0.41;
    planet.add(Atmosphere);
  }

  //add moons
  if(moons){
    moons.forEach(moon => {
      let moonMaterial;
      
      if(moon.bump){
        moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture),
          bumpMap: loadTexture.load(moon.bump),
          bumpScale: 0.5
        });
      } else{
        moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture)
        });
      }
      const moonGeometry = new THREE.SphereGeometry(moon.size, 32, 20);
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
      const moonOrbitDistance = size * 1.5;
      moonMesh.position.set(moonOrbitDistance, 0, 0);
      planetSystem.add(moonMesh);
      moon.mesh = moonMesh;
    });
  }
  //add planet system to planet3d object and to the scene
  planet3d.add(planetSystem);
  scene.add(planet3d);
  return {name, planet, planet3d, Atmosphere, moons, planetSystem, Ring};
}


function loadObject(path, position, scale, callback) {
  const loader = new GLTFLoader();

  loader.load(path, function (gltf) {
      const obj = gltf.scene;
      obj.position.set(position, 0, 0);
      obj.scale.set(scale, scale, scale);
      scene.add(obj);
      if (callback) {
        callback(obj);
      }
  }, undefined, function (error) {
      console.error('An error happened', error);
  });
}

//  ASTEROIDS 
const asteroids = [];
function loadAsteroids(path, numberOfAsteroids, minOrbitRadius, maxOrbitRadius) {
  const loader = new GLTFLoader();
  loader.load(path, function (gltf) {
      gltf.scene.traverse(function (child) {
          if (child.isMesh) {
              for (let i = 0; i < numberOfAsteroids / 12; i++) { // Divide by 12 because there are 12 asteroids in the pack
                  const asteroid = child.clone();
                  const orbitRadius = THREE.MathUtils.randFloat(minOrbitRadius, maxOrbitRadius);
                  const angle = Math.random() * Math.PI * 2;
                  const x = orbitRadius * Math.cos(angle);
                  const y = 0;
                  const z = orbitRadius * Math.sin(angle);
                  child.receiveShadow = true;
                  asteroid.position.set(x, y, z);
                  asteroid.scale.setScalar(THREE.MathUtils.randFloat(0.8, 1.2));
                  scene.add(asteroid);
                  asteroids.push(asteroid);
              }
          }
      });
  }, undefined, function (error) {
      console.error('An error happened', error);
  });
}


// Earth day/night effect shader material
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


//  MOONS 
// Earth
const earthMoon = [{
  size: 1.6,
  texture: earthMoonTexture,
  bump: earthMoonBump,
  orbitSpeed: 0.001 * settings.Revolusi,
  orbitRadius: 10
}]

// Mars' moons with path to 3D models (phobos & deimos)
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

// Jupiter
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

//  PLANET CREATIONS 
const mercury = new createPlanet('Mercury', 2.4, 40, 0, mercuryTexture, mercuryBump);
const venus = new createPlanet('Venus', 6.1, 65, 3, venusTexture, venusBump, null, venusAtmosphere);
const earth = new createPlanet('Earth', 6.4, 90, 23, earthMaterial, null, null, earthAtmosphere, earthMoon);
const mars = new createPlanet('Mars', 3.4, 115, 25, marsTexture, marsBump)
// Load Mars moons
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
  });
});

const jupiter = new createPlanet('Jupiter', 69/4, 200, 3, jupiterTexture, null, null, null, jupiterMoons);
const saturn = new createPlanet('Saturn', 58/4, 270, 26, saturnTexture, null, {
  innerRadius: 18, 
  outerRadius: 29, 
  texture: satRingTexture
});
const uranus = new createPlanet('Uranus', 25/4, 320, 82, uranusTexture, null, {
  innerRadius: 6, 
  outerRadius: 8, 
  texture: uraRingTexture
});
const neptune = new createPlanet('Neptune', 24/4, 340, 28, neptuneTexture);

  //  PLANETS DATA 
  const planetData = {
    'Mercury': {
      radius: '2.439,7 km',
      tilt: '0,034°',
      rotation: '58,6 hari Bumi',
      orbit: '88 hari Bumi',
      distance: '57,9 juta km',
      moons: '0',
      info: 'Planet terkecil di tata surya kita dan terdekat dengan Matahari.'
    },
    'Venus': {
      radius: '6.051,8 km',
      tilt: '177,4°',
      rotation: '243 hari Bumi',
      orbit: '225 hari Bumi',
      distance: '108,2 juta km',
      moons: '0',
      info: 'Planet kedua dari Matahari, dikenal dengan suhu ekstrem dan atmosfer tebalnya.'
    },
    'Earth': {
      radius: '6.371 km',
      tilt: '23,5°',
      rotation: '24 jam',
      orbit: '365 hari',
      distance: '150 juta km',
      moons: '1 (Bulan)',
      info: 'Planet ketiga dari Matahari dan satu-satunya planet yang diketahui memiliki kehidupan.'
    },
    'Mars': {
      radius: '3.389,5 km',
      tilt: '25,19°',
      rotation: '1,03 hari Bumi',
      orbit: '687 hari Bumi',
      distance: '227,9 juta km',
      moons: '2 (Phobos dan Deimos)',
      info: 'Dikenal sebagai Planet Merah, terkenal dengan penampilannya yang kemerahan dan potensi untuk kolonisasi manusia.'
    },
    'Jupiter': {
      radius: '69.911 km',
      tilt: '3,13°',
      rotation: '9,9 jam',
      orbit: '12 tahun Bumi',
      distance: '778,5 juta km',
      moons: '95 bulan yang diketahui (Ganymede, Callisto, Europa, Io adalah 4 yang terbesar)',
      info: 'Planet terbesar di tata surya kita, dikenal dengan Bintik Merah Besarnya.'
    },
    'Saturn': {
      radius: '58.232 km',
      tilt: '26,73°',
      rotation: '10,7 jam',
      orbit: '29,5 tahun Bumi',
      distance: '1,4 miliar km',
      moons: '146 bulan yang diketahui',
      info: 'Dibedakan oleh sistem cincinnya yang luas, planet terbesar kedua di tata surya kita.'
    },
    'Uranus': {
      radius: '25.362 km',
      tilt: '97,77°',
      rotation: '17,2 jam',
      orbit: '84 tahun Bumi',
      distance: '2,9 miliar km',
      moons: '27 bulan yang diketahui',
      info: 'Dikenal dengan rotasi menyamping yang unik dan warna biru pucatnya.'
    },
    'Neptune': {
      radius: '24.622 km',
      tilt: '28,32°',
      rotation: '16,1 jam',
      orbit: '165 tahun Bumi',
      distance: '4,5 miliar km',
      moons: '14 bulan yang diketahui',
      info: 'Planet terjauh dari Matahari di tata surya kita, dikenal dengan warna biru tuanya.'
    },
  };

  //  SATELLITES DATA
  const satelliteData = {
    'Mercury': [],
    'Venus': [],
    'Earth': [
      {
        name: 'Bulan (Moon)',
        radius: '1.737,4 km',
        distance: '384.400 km dari Bumi',
        orbit: '27,3 hari',
        info: 'Satu-satunya satelit alami Bumi. Bulan adalah satelit terbesar kelima di tata surya.'
      }
    ],
    'Mars': [
      {
        name: 'Phobos',
        radius: '11,3 km',
        distance: '9.376 km dari Mars',
        orbit: '7,7 jam',
        info: 'Satelit terbesar Mars, bergerak sangat cepat mengelilingi planet induknya.'
      },
      {
        name: 'Deimos',
        radius: '6,2 km',
        distance: '23.463 km dari Mars',
        orbit: '30,3 jam',
        info: 'Satelit terkecil Mars, memiliki permukaan yang lebih halus dibanding Phobos.'
      }
    ],
    'Jupiter': [
      {
        name: 'Io',
        radius: '1.821,6 km',
        distance: '421.700 km dari Jupiter',
        orbit: '1,77 hari',
        info: 'Satelit dengan aktivitas vulkanik paling aktif di tata surya.'
      },
      {
        name: 'Europa',
        radius: '1.560,8 km',
        distance: '671.034 km dari Jupiter',
        orbit: '3,55 hari',
        info: 'Memiliki samudra di bawah permukaan es, kandidat potensial untuk kehidupan.'
      },
      {
        name: 'Ganymede',
        radius: '2.634,1 km',
        distance: '1.070.412 km dari Jupiter',
        orbit: '7,15 hari',
        info: 'Satelit terbesar di tata surya, bahkan lebih besar dari planet Merkurius.'
      },
      {
        name: 'Callisto',
        radius: '2.410,3 km',
        distance: '1.882.709 km dari Jupiter',
        orbit: '16,69 hari',
        info: 'Satelit dengan kawah paling banyak di tata surya, permukaannya sangat tua.'
      }
    ],
    'Saturn': [
      {
        name: 'Titan',
        radius: '2.574,7 km',
        distance: '1.221.870 km dari Saturn',
        orbit: '15,95 hari',
        info: 'Satelit terbesar kedua di tata surya, memiliki atmosfer tebal seperti Bumi.'
      },
      {
        name: 'Rhea',
        radius: '763,8 km',
        distance: '527.108 km dari Saturn',
        orbit: '4,52 hari',
        info: 'Satelit terbesar kedua Saturn, terdiri sebagian besar dari es air.'
      },
      {
        name: 'Iapetus',
        radius: '734,5 km',
        distance: '3.560.820 km dari Saturn',
        orbit: '79,33 hari',
        info: 'Memiliki satu sisi terang dan satu sisi gelap, fenomena yang masih misterius.'
      }
    ],
    'Uranus': [
      {
        name: 'Titania',
        radius: '788,4 km',
        distance: '435.910 km dari Uranus',
        orbit: '8,71 hari',
        info: 'Satelit terbesar Uranus dengan ngarai dan kawah yang dalam.'
      },
      {
        name: 'Oberon',
        radius: '761,4 km',
        distance: '583.520 km dari Uranus',
        orbit: '13,46 hari',
        info: 'Satelit terjauh dari planet induknya di antara satelit besar Uranus.'
      },
      {
        name: 'Umbriel',
        radius: '584,7 km',
        distance: '266.000 km dari Uranus',
        orbit: '4,14 hari',
        info: 'Satelit tergelap Uranus dengan permukaan yang hampir seragam.'
      }
    ],
    'Neptune': [
      {
        name: 'Triton',
        radius: '1.353,4 km',
        distance: '354.759 km dari Neptunus',
        orbit: '5,88 hari',
        info: 'Satelit terbesar Neptunus, berotasi berlawanan arah dengan planet induknya.'
      },
      {
        name: 'Proteus',
        radius: '210 km',
        distance: '117.647 km dari Neptunus',
        orbit: '1,12 hari',
        info: 'Satelit terbesar kedua Neptunus, bentuknya tidak bulat sempurna.'
      }
    ]
  };


// Array of planets and atmospheres for raycasting
const raycastTargets = [
  mercury.planet, venus.planet, venus.Atmosphere, earth.planet, earth.Atmosphere,
  mars.planet, jupiter.planet, saturn.planet, uranus.planet, neptune.planet
];

//  SHADOWS 
renderer.shadowMap.enabled = true;
pointLight.castShadow = true;

//properties for the point light
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 10;
pointLight.shadow.camera.far = 20;

//casting and receiving shadows
earth.planet.castShadow = true;
earth.planet.receiveShadow = true;
earth.Atmosphere.castShadow = true;
earth.Atmosphere.receiveShadow = true;
earth.moons.forEach(moon => {
moon.mesh.castShadow = true;
moon.mesh.receiveShadow = true;
});
mercury.planet.castShadow = true;
mercury.planet.receiveShadow = true;
venus.planet.castShadow = true;
venus.planet.receiveShadow = true;
venus.Atmosphere.receiveShadow = true;
mars.planet.castShadow = true;
mars.planet.receiveShadow = true;
jupiter.planet.castShadow = true;
jupiter.planet.receiveShadow = true;
jupiter.moons.forEach(moon => {
  moon.mesh.castShadow = true;
  moon.mesh.receiveShadow = true;
  });
saturn.planet.castShadow = true;
saturn.planet.receiveShadow = true;
saturn.Ring.receiveShadow = true;
uranus.planet.receiveShadow = true;
neptune.planet.receiveShadow = true;




function animate(){

  //rotating planets around the sun and itself
  sun.rotateY(0.001 * settings.Rotasi);
  mercury.planet.rotateY(0.001 * settings.Rotasi);
  mercury.planet3d.rotateY(0.004 * settings.Revolusi);
  venus.planet.rotateY(0.0005 * settings.Rotasi)
  venus.Atmosphere.rotateY(0.0005 * settings.Rotasi);
  venus.planet3d.rotateY(0.0006 * settings.Revolusi);
  earth.planet.rotateY(0.005 * settings.Rotasi);
  earth.Atmosphere.rotateY(0.001 * settings.Rotasi);
  earth.planet3d.rotateY(0.001 * settings.Revolusi);
  mars.planet.rotateY(0.01 * settings.Rotasi);
  mars.planet3d.rotateY(0.0007 * settings.Revolusi);
  jupiter.planet.rotateY(0.005 * settings.Rotasi);
  jupiter.planet3d.rotateY(0.0003 * settings.Revolusi);
  saturn.planet.rotateY(0.01 * settings.Rotasi);
  saturn.planet3d.rotateY(0.0002 * settings.Revolusi);
  uranus.planet.rotateY(0.005 * settings.Rotasi);
  uranus.planet3d.rotateY(0.0001 * settings.Revolusi);
  neptune.planet.rotateY(0.005 * settings.Rotasi);
  neptune.planet3d.rotateY(0.00008 * settings.Revolusi);

// Animate Earth's moon
if (earth.moons) {
  earth.moons.forEach(moon => {
    const time = performance.now();
    const tiltAngle = 5 * Math.PI / 180;

    const moonX = earth.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed);
    const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed) * Math.sin(tiltAngle);
    const moonZ = earth.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed) * Math.cos(tiltAngle);

    moon.mesh.position.set(moonX, moonY, moonZ);
    moon.mesh.rotateY(0.01);
  });
}
// Animate Mars' moons
if (marsMoons){
marsMoons.forEach(moon => {
  if (moon.mesh) {
    const time = performance.now();

    const moonX = mars.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed);
    const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed);
    const moonZ = mars.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed);

    moon.mesh.position.set(moonX, moonY, moonZ);
    moon.mesh.rotateY(0.001);
  }
});
}

// Animate Jupiter's moons
if (jupiter.moons) {
  jupiter.moons.forEach(moon => {
    const time = performance.now();
    const moonX = jupiter.planet.position.x + moon.orbitRadius * Math.cos(time * moon.orbitSpeed);
    const moonY = moon.orbitRadius * Math.sin(time * moon.orbitSpeed);
    const moonZ = jupiter.planet.position.z + moon.orbitRadius * Math.sin(time * moon.orbitSpeed);

    moon.mesh.position.set(moonX, moonY, moonZ);
    moon.mesh.rotateY(0.01);
  });
}

// Rotate asteroids
asteroids.forEach(asteroid => {
  asteroid.rotation.y += 0.0001;
  asteroid.position.x = asteroid.position.x * Math.cos(0.0001 * settings.Revolusi) + asteroid.position.z * Math.sin(0.0001 * settings.Revolusi);
  asteroid.position.z = asteroid.position.z * Math.cos(0.0001 * settings.Revolusi) - asteroid.position.x * Math.sin(0.0001 * settings.Revolusi);
});

// OUTLINES ON PLANETS
raycaster.setFromCamera(mouse, camera);

// Check for intersections
var intersects = raycaster.intersectObjects(raycastTargets);

// Reset all outlines
outlinePass.selectedObjects = [];

if (intersects.length > 0) {
  const intersectedObject = intersects[0].object;

  // If the intersected object is an atmosphere, find the corresponding planet
  if (intersectedObject === earth.Atmosphere) {
    outlinePass.selectedObjects = [earth.planet];
  } else if (intersectedObject === venus.Atmosphere) {
    outlinePass.selectedObjects = [venus.planet];
  } else {
    // For other planets, outline the intersected object itself
    outlinePass.selectedObjects = [intersectedObject];
  }
}
//  ZOOM IN/OUT 
if (isMovingTowardsPlanet) {
  // Smoothly move the camera towards the target position
  camera.position.lerp(targetCameraPosition, 0.03);

  // Check if the camera is close to the target position
  if (camera.position.distanceTo(targetCameraPosition) < 1) {
      isMovingTowardsPlanet = false;
      showPlanetInfo(selectedPlanet.name);

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
// TAB SWITCHING FUNCTION
function switchTab(event, tabName) {
  // Hide all tab contents
  const tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }

  // Remove active class from all buttons
  const tabButtons = document.getElementsByClassName('tab-button');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }

  // Show the selected tab content
  document.getElementById(tabName).classList.add('active');
  
  // Add active class to the clicked button
  event.currentTarget.classList.add('active');
}
window.switchTab = switchTab;

loadAsteroids('/asteroids/asteroidPack.glb', 1000, 130, 160);
loadAsteroids('/asteroids/asteroidPack.glb', 3000, 352, 370);
animate();

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onDocumentMouseDown, false);
window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  composer.setSize(window.innerWidth,window.innerHeight);
});

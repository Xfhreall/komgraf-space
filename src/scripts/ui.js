import { planetData, satelliteData } from './constants.js';

export function showPlanetInfo(planet) {
  var info = document.getElementById('planetInfo');
  var name = document.getElementById('planetName');
  var details = document.getElementById('planetDetails');
  var satelliteDetails = document.getElementById('satelliteDetails');

  name.innerText = planet;
  details.innerText = `Radius: ${planetData[planet].radius}\nTilt: ${planetData[planet].tilt}\nRotation: ${planetData[planet].rotation}\nOrbit: ${planetData[planet].orbit}\nDistance: ${planetData[planet].distance}\nMoons: ${planetData[planet].moons}\nInfo: ${planetData[planet].info}`;

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

export function closeInfo(settings, controls) {
  var info = document.getElementById('planetInfo');
  info.style.display = 'none';
  settings.Revolusi = 1;
  controls.target.set(0, 0, 0);
  resetTabs();
  return { isZoomingOut: true };
}

export function closeInfoNoZoomOut(settings) {
  var info = document.getElementById('planetInfo');
  info.style.display = 'none';
  settings.Revolusi = 1;
  resetTabs();
}

export function resetTabs() {
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

export function switchTab(event, tabName) {
  const tabContents = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove('active');
  }
  const tabButtons = document.getElementsByClassName('tab-button');
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  event.currentTarget.classList.add('active');
}

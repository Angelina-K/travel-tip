import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready');
    })
    .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  console.log('Adding a marker');
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then(renderLocs);
  //   => {
  // console.log('Locations:', locs);
  // renderLocs();
  // document.querySelector('.locs').innerText = JSON.stringify(locs);
  //   });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords);
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
    })
    .catch((err) => {
      console.log('err!!!', err);
    });
}
function onPanTo() {
  console.log('Panning the Map');
  mapService.panTo(35.6895, 139.6917);
}

function onGo() {
  console.log('onGo');
  // take input
}
function onMyLoc() {
  console.log('onMyLoc');
}
function onCopyLoc() {
  console.log('onCopyLoc');
}
function renderLocs(locs) {
  const headerStr = `<h4>Locations:</h4>`;
  const strHtml = locs.map((loc, idx) => {
    const strLoc = `<div class="loc loc${idx} flex align-center space-between">
      <div class="flex align-center gap">
      <h3>${loc.name}</h3>
      <span>Created At: ${loc.createdAt} <span>
      <span>Last Update: ${loc.updatedAt} <span>
      </div>
      <div>
      <button onclick="onGoToSaved(${idx})" class="btn go-btn">Go</button>
      <button onclick="onDeleteSaved(${idx})" class="btn delete-btn">Delete</button>
      </div>
      </div>`;
    return strLoc;
  });
  const elLocs = document.querySelector('.locs-container');
  elLocs.innerHTML = headerStr + strHtml.join('');
}

function onGoToSaved() {
  console.log('onGoToSaved');
}
function onDeleteSaved() {
  console.log('onDeleteSaved');
}

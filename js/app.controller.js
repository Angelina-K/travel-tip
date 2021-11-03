import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onMapClick = onMapClick;

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

function onAddMarker(lat, lng) {
  console.log('Adding a marker');
  mapService.addMarker({ lat, lng });
}

function onGetLocs() {
  locService.getLocs().then(renderLocs);
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
function onPanTo(lat, lng) {
  console.log('Panning the Map');
  // mapService.panTo(35.6895, 139.6917);
  mapService.panTo(lat, lng);
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
  console.log(locs);
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

function onGoToSaved(lat, lang) {
  mapService.panTo(lat, lng);
  console.log('onGoToSaved');
}
function onDeleteSaved() {
  console.log('onDeleteSaved');
}
function onMapClick(e) {
  const locName = prompt('Cool place! How should we call it?');
  const lat = e.latLng.lat();
  const lng = e.latLng.lng();
  onAddMarker(lat, lng);
  onPanTo(lat, lng);
  locService.createLoc(locName, lat, lng);
  // saveToStorage('placesDB', gPlacesNames)
  // renderPlaces()
}

function placeMarkerAndPanTo(latLng, map) {
  let marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
  map.panTo(latLng);
  return { marker };
}

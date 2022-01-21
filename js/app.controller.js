import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
// window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onMapClick = onMapClick;
window.onGoToSaved = onGoToSaved;
window.onSearch = onSearch;
window.onRemoveSaved = onRemoveSaved;
window.copyToClipboard = copyToClipboard;
window.renderCurrentLocation = renderCurrentLocation;

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function onInit() {
  mapService
    .initMap(+params.lat, +params.lng)
    .then(() => {
      locService.getLocs().then(renderLocs);
    })
    .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker(lat, lng) {
  mapService.addMarker({ lat, lng });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      mapService.panTo(lat, lng);
      mapService.addMarker({ lat, lng });
      locService.getAddress(lat, lng).then(renderCurrLoc);
    })
    .catch((err) => {
      console.log('err!!!', err);
    });
}

function onPanTo(lat, lng) {
  mapService.panTo(lat, lng);
}

function onSearch() {
  const elInput = document.querySelector('input[type="search"]');
  const input = elInput.value;
  locService.getLocBySearch(input).then((res) => {
    onPanTo(res.lat, res.lng);
  });
}

function copyToClipboard(elbtn) {
  elbtn.innerText = 'Copied!';
  let pos = getCenterPos();
  let dummy = document.createElement('input');
  let text = `${window.location.href}?lat=${pos.lat}&lng=${pos.lng}`;

  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  setTimeout(() => {
    elbtn.innerText = 'Copy Location';
  }, 1500);
}

function renderLocs(locs) {
  const headerStr = `<h4>Locations:</h4>`;
  const strHtml = locs.map((loc, idx) => {
    const { address, name, lat, lng, createdAt, updatedAt } = loc;
    mapService.addMarker({ lat, lng });
    const strLoc = `<div class="loc loc${idx} flex align-center space-between">
    <h3>${name}</h3>
      <div class=" address ">
      <span>${address} <span>
      </div>
      <div class" loc-btns ">
      <button onclick="onGoToSaved(${lat},${lng})" class="btn-round">Go</button>
      <button onclick="onRemoveSaved(${idx})" class="btn-round remove-btn"><img src="img/trash.png" alt=""></button>
      </div>
      </div>`;
    return strLoc;
  });

  const elLocs = document.querySelector('.locs-container');
  // elLocs.innerHTML = headerStr + strHtml.join('');
  elLocs.innerHTML = strHtml.join('');
}

function onGoToSaved(lat, lng) {
  mapService.panTo(lat, lng);
}

function onRemoveSaved(idx) {
  locService.removeLoc(idx);
  locService.getLocs().then(renderLocs);
}

function onMapClick(e, lat, lng) {
  const locName = prompt('Cool place! How should we call it?');
  if (!locName) return;
  lat = lat || e.latLng.lat();
  lng = lng || e.latLng.lng();
  onAddMarker(lat, lng);
  // renderWeather();
  onPanTo(lat, lng);
  locService
    .getAddress(lat, lng)
    .then((res) => {
      locService.createLoc(locName, lat, lng, res);
    })
    .then(() => locService.getLocs().then(renderLocs));
}

function renderCurrentLocation() {
  let pos = getCenterPos();
  locService.getAddress(pos.lat, pos.lng).then((res) => {
    document.querySelector('h3 span').innerText = res;
    // renderWeather()
  });
}

function getCenterPos() {
  let map = mapService.getMap();
  let lat = map.getCenter().lat();
  let lng = map.getCenter().lng();
  return { lat, lng };
}

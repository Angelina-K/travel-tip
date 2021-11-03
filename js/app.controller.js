import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onMapClick = onMapClick;
window.onGoToSaved = onGoToSaved;
window.onSearch = onSearch;
window.onRemoveSaved = onRemoveSaved


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
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            mapService.panTo(lat, lng);
            mapService.addMarker({ lat, lng });
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
    let pos
    locService.getLocBySearch(input)
        .then(res => {
            onMapClick(null, res.lat, res.lng, input)
        })
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
      <button onclick="onGoToSaved(${loc.lat},${loc.lng})" class="btn go-btn">Go</button>
      <button onclick="onRemoveSaved(${idx})" class="btn remove-btn">Delete</button>
      </div>
      </div>`;
        return strLoc;
    });
    const elLocs = document.querySelector('.locs-container');
    elLocs.innerHTML = headerStr + strHtml.join('');
}

function onGoToSaved(lat, lng) {
    console.log(lat, lng);
    console.log('onGoToSaved');
    mapService.panTo(lat, lng);
}

function onRemoveSaved(idx) {
    locService.removeLoc(idx);
}
function onMapClick(e, lat, lng, address) {
    const locName = prompt('Cool place! How should we call it?');
    if (!locName) return
    lat = lat || e.latLng.lat()
    lng = lng || e.latLng.lng()
    onAddMarker(lat, lng)
    onPanTo(lat, lng)
    if (!address) {
        locService.getAddress(lat, lng)
            .then(res => {
                locService.createLoc(locName, lat, lng, res)
            })
    } else locService.createLoc(locName, lat, lng, address)
    // renderPlaces()
}

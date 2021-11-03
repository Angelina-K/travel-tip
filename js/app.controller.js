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
window.onCopyLoc = onCopyLoc;

function onInit() {
    mapService
        .initMap()
        .then(() => {
            locService.getLocs().then(renderLocs);
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

// function onGetLocs() {
//   locService.getLocs().then(renderLocs);
// }

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
    locService.getLocBySearch(input)
        .then(res => {
            onMapClick(null, res.lat, res.lng, input)
        })
}

function onCopyLoc() {
<<<<<<< HEAD
  console.log(
    'https://angelina-k.github.io/travel-tip/index.html?lat=32.0749831&lng=34.9120554'
  );
  return 'https://angelina-k.github.io/travel-tip/index.html?lat=32.0749831&lng=34.9120554';

  // let url = new URL('https://angelina-k.github.io/travel-tip/');
  // let params = new URLSearchParams(url.search.slice(1));

  // //Add a second foo parameter.
  // params.append('foo', 4);
  // console.log(url);
  // copyToClipboard();
  // save loc for copy
  // locService.getLocs().then(copyLoc);
=======
    let url = new URL('https://angelina-k.github.io/travel-tip/');
    let params = new URLSearchParams(url.search.slice(1));

    //Add a second foo parameter.
    params.append('foo', 4);
    console.log(url);
    copyToClipboard();
    // save loc for copy
    // locService.getLocs().then(copyLoc);
>>>>>>> d62f7c883b89af5512d38ef5dda848aa863fb3c7
}

function copyToClipboard() {
    var dummy = document.createElement('input'),
        text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    // document.body.removeChild(dummy);
}

function copyLoc(locs) {
    const { lat, lng } = locs;
    const url = `https://angelina-k.github.io/travel-tip/index.html?lat=${lat}&lng=${lng}`;
    console.log(url);
}

function renderLocs(locs) {
    const headerStr = `<h4>Locations:</h4>`;
    const strHtml = locs.map((loc, idx) => {
        const { name, lat, lng, createdAt, updatedAt } = loc;
        mapService.addMarker({ lat, lng });
        const strLoc = `<div class="loc loc${idx} flex align-center space-between">
      <div class="flex align-center gap">
      <h3>${name}</h3>
      <span>Created At: ${createdAt} <span>
      <span>Last Update: ${updatedAt} <span>
      </div>
      <div>
      <button onclick="onGoToSaved(${lat},${lng})" class="btn go-btn">Go</button>
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
    locService.getLocs().then(renderLocs);
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


//   mapService.panTo(lat, lng);
//   mapService.addMarker({ lat, lng });
// }



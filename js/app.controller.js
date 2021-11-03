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
    locService.getLocs().then((locs) => {
        console.log('Locations:', locs);
        document.querySelector('.locs').innerText = JSON.stringify(locs);
    });
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

function onMapClick(e) {
    const locName = prompt('Cool place! How should we call it?')
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    onAddMarker(lat, lng)
    onPanTo(lat, lng)
    locService.createLoc(locName, lat, lng)
    // saveToStorage('placesDB', gPlacesNames)
    // renderPlaces()
}
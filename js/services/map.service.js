export const mapService = {
  initMap,
  addMarker,
  panTo,
  getMap,
};

var gMap;

function initMap(lat, lng) {
  if (!lat && !lng) {
    lat = 32.0749831;
    lng = 34.9120554;
  }
  return _connectGoogleApi().then(() => {
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    });
    gMap.addListener('click', (e) => {
      onMapClick(e);
    });
    gMap.addListener('dragend', (e) => {
      renderCurrentLocation();
    });
  });
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = ''; //TODO: Enter your API Key
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAxYW_FjuUgnuOXRQY7Re8yde2lPtht1Qk`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}

function getMap() {
  return gMap;
}

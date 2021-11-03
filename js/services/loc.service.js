import { storageService } from './storage-service.js';

export const locService = {
    getLocs,
    createLoc,
    removeLoc,
    getLocBySearch,
    getAddress,
    getwWeather
}
const locs_KEY = 'locsDB'
const locs = storageService.load(locs_KEY) || []

let nextId = 101

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function createLoc(name, lat, lng, address) {
    const time = new Date().toLocaleString();
    const loc = {
        id: nextId++,
        name,
        lat,
        lng,
        address,
        weather: null,
        createdAt: time,
        updatedAt: time,
    }
    console.log('adding new loc..');
    console.log('loc', loc);
    locs.push(loc)
    storageService.save(locs_KEY, locs)
}

function removeLoc(idx) {
    locs.splice(idx, 1)
    storageService.save(locs_KEY, locs)
}

function getLocBySearch(input) {
    input = input.replace(' ', '+')
    console.log('input', input)
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=AIzaSyAxYW_FjuUgnuOXRQY7Re8yde2lPtht1Qk`)
        .then(res => {
            return res.data.results[0].geometry.location
        })
}

function getAddress(lat, lng) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAxYW_FjuUgnuOXRQY7Re8yde2lPtht1Qk`)
        .then(res => {
            return res.data.results[0].formatted_address
        })
}

// function getwWeather(lat, lng) {
//     lat = lat.toFixed(2);
//     lng = lng.toFixed(2);
//     console.log('lat, lng', lat, lng)
//     return axios.get(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=0cc0f9041908300623a776700a09b0cd`)
//         .then(res => {
//             console.log('res', res.weather);
//             return res
//         })
// }
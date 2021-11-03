
export const locService = {
    getLocs,
    createLoc,
    removeLoc
}

const locs = []
// { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
// { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }

let nextId = 101

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function createLoc(name, lat, lng) {
    const time = new Date()
    const loc = {
        id: nextId++,
        name,
        lat,
        lng,
        weather: null,
        createdAt: time,
        updatedAt: time,
    }
    console.log('adding new loc..');
    locs.push(loc)
    // storageService.save(locs_KEY, locs)
}

function removeLoc(idx) {
    locs.splice(idx, 1)
    // storageService.save(locs_KEY, locs)
}


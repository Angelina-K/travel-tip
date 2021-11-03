export const locService = {
  getLocs,
  createLoc,
};

let nextId = 101;

const locs = [];

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}

function createLoc(name, lat, lng) {
  const time = new Date();
  const loc = {
    id: nextId++,
    name,
    lat,
    lng,
    weather: null,
    createdAt: time,
    updatedAt: time,
  };
  console.log('adding new loc..');
  locs.push(loc);
}

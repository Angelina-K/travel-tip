'use strict';
export const storageService = {
  save: saveToStorage,
  load: loadFromStorage,
};

function loadFromStorage(key) {
  const json = localStorage.getItem(key);
  const val = JSON.parse(json);
  return val;
}

function saveToStorage(key, val) {
  const json = JSON.stringify(val);
  localStorage.setItem(key, json);
}

'use strict';
import { storageService } from './storage-service.js';
// export const service={
// }

function _saveToStorage() {
  // saveToStorage('DB', gBooks);
  storageService.save();
}

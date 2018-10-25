import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    constructor() {}

    getFromStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

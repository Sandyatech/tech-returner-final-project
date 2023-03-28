export function addCurrentLocationToLocalStorage(location: string) {    
    if (isLocalStorageAvailable()) {
        localStorage.setItem('currentLocation', location);
    }
}

export function getCurrentLocationFromLocalStorage() {
    return isLocalStorageAvailable() ? localStorage.getItem('currentLocation') : '';
}

const isLocalStorageAvailable = () => {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

export function addEntryToLocalStorage(key:any,value:any) {
    if (isLocalStorageAvailable()) {
        localStorage.setItem(key, value);
    }
}

export function getEntryFromLocalStorage(key:any) {
    return isLocalStorageAvailable() ? localStorage.getItem(key) : '';
}

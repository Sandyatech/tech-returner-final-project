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

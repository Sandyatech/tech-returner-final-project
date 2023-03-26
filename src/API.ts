export const headers = {
    "X-RapidAPI-Key": "3ef5c4e138msh91644e12beb4158p1e5cb6jsn1b6b43ab6590",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
};

export const options = {
    method: "GET",
    headers: headers,
};

export const BASE_URL = "https://weatherapi-com.p.rapidapi.com/";
export const CURRENT_URL = `${BASE_URL}current.json`;
export const FORECAST_URL = `${BASE_URL}forecast.json`;
export const HISTORY_URL = `${BASE_URL}history.json`;

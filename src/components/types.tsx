export interface WeatherData {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
}

export interface CurrentWeatherData {
    last_updated: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    uv: number;
}

export interface LocationData {
    name: string;
    region: string;
    country: string;
    localtime: string;
}

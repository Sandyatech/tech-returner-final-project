const RESPONSE_TYPE = ["RootCurrent", "RootForecast", "RootHistroy"] as const;
export type ResponseType = typeof RESPONSE_TYPE[number];

export type RootCurrent = {
    location: Location;
    current: CurrentWeatherData;
};

export type RootForecast = {
    location: Location;
    current: CurrentWeatherData;
    forecast: {
        forecastday: Array<Forecastday>;
    };
};

export type RootHistroy = {
    location: Location;
    forecast: {
        forecastday: Array<Forecastday>;
    };
};

export type Location = {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
};

export type CurrentWeatherData = CommonWeatherData & {
    last_updated_epoch: number;
    last_updated: string;
};

export type Forecastday = {
    date: string;
    date_epoch: number;
    day: Day;
    astro: Astro;
    hour: Array<HourlyData>;
};

export type HourlyData = CommonWeatherData & {
    time_epoch: number;
    time: string;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
};

export type CommonWeatherData = {
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
};

export type Day = {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    uv: number;
};

export type Astro = {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
};

export type hour = {
    time: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string;
    };
};

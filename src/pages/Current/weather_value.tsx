import React from "react";

import { RootCurrent, Location, CurrentWeatherData } from "../../types/types_weather";

export interface propsWeather {
    dataWeather: {
        location: Location;
        current: CurrentWeatherData;
    };
}

const ComponentCurrentWether: React.FC<propsWeather> = ({ dataWeather }) => {
    return (
        <div className="Current current-width">
            <div className="Current-header">
                <h3> {dataWeather.location.name} </h3>
            </div>
            <div>
                <div className="Current-row">
                    <div className="Current-col">Region :</div>
                    <div className="Current-col">{dataWeather.location.region}</div>
                </div>
                <div className="Current-row">
                    <div className="Current-col">Country :</div>
                    <div className="Current-col">{dataWeather.location.country}</div>
                </div>
                <div className="Current-row">
                    <div className="Current-col">Time Zone :</div>
                    <div className="Current-col">{dataWeather.location.tz_id}</div>
                </div>
                <div className="Current-row">
                    <div className="Current-col">Tempature C :</div>
                    <div className="Current-col">{dataWeather.current.temp_c}</div>
                </div>
                <div className="Current-row">
                    <div className="Current-col">Tempature F :</div>
                    <div className="Current-col">{dataWeather.current.temp_f}</div>
                </div>
                <div className="Current-row">
                    <div className="Current-col">Weather Status :</div>
                    <div className="Current-col">{dataWeather.current.condition.text}</div>
                </div>
                <div className="Current-row">
                    <div className="Current-col">Weather Icon :</div>
                    <div className="Current-col">
                        <img src={dataWeather.current.condition.icon}></img>
                    </div>
                </div>
                <div className="Current-row">
                    <div className="Current-col">Wind MPH :</div>
                    <div className="Current-col">{dataWeather.current.wind_mph}</div>
                </div>
                <div className="Current-row">
                    <div className="Current-col">Wind Kph :</div>
                    <div className="Current-col">{dataWeather.current.wind_kph}</div>
                </div>
            </div>
        </div>
    );
};

export default ComponentCurrentWether;

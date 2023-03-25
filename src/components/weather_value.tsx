import React from "react";

import { Root_current, Location, CurrentWeatherData } from "./interface_weather" ;


export interface propsWeather {

    dataWeather: {
        location: Location;
        current: CurrentWeatherData
    }
}


const ComponentCurrentWether: React.FC<propsWeather> = ({ dataWeather }) => {

    return (

        <div className="App-header">

            <h3>  {dataWeather.location.name} </h3>
            <table>
                <tr>
                    <td>Region :</td>
                    <td>{dataWeather.location.region}</td>
                </tr>
                <tr>
                    <td>Country :</td>
                    <td>{dataWeather.location.country}</td>
                </tr>
                <tr>
                    <td>Time Zone :</td>
                    <td>{dataWeather.location.tz_id}</td>
                </tr>
                <tr>
                    <td>Tempature C :</td>
                    <td>{dataWeather.current.temp_c}</td>
                </tr>
                <tr>
                    <td>Tempature F :</td>
                    <td>{dataWeather.current.temp_f}</td>
                </tr>
                <tr>
                    <td>Weather Status :</td>
                    <td>{dataWeather.current.condition.text}</td>
                </tr>
                <tr>
                    <td>Weather Icon :</td>
                    <td><img src={dataWeather.current.condition.icon}></img></td>
                </tr>
                <tr>
                    <td>Wind MPH :</td>
                    <td>{dataWeather.current.wind_mph}</td>
                </tr>
                <tr>
                    <td>Wind Kph :</td>
                    <td>{dataWeather.current.wind_kph}</td>
                </tr>
            </table>


        </div>

    );

};

export default ComponentCurrentWether;
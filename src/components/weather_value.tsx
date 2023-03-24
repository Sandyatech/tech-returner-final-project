import React from "react";
import {Root } from "./interface_weather" ;


export interface propsWeather {

    dataWeather: Root
   

};

const ComponentCurrentWether: React.FC<propsWeather> = ({ dataWeather }) => {

    return (

        <div className="App-header">
            
            <h3>  {dataWeather.location.name} </h3>
            <p> Region : {dataWeather.location.region} </p>
            <p> Country : {dataWeather.location.country} </p>
            <p> TZ : {dataWeather.location.tz_id} </p>
            <p> Tempature C  : {dataWeather.current.temp_c} </p>
            <p> Tempature F : {dataWeather.current.temp_f} </p>
            <p> Weather Status : {dataWeather.current.condition.text} </p>
            <p> Weather Icon : {dataWeather.current.condition.icon} </p>
            <p> wind_mph  : {dataWeather.current.wind_mph} </p>
            <p> wind_kph : {dataWeather.current.wind_kph} </p>

        </div>

    );

};

export default ComponentCurrentWether;
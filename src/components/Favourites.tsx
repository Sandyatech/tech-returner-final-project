import React, { FormEvent, useState ,useEffect} from 'react';
import axios from "axios";
import CurrentWeather from './Current';
import { RootCurrent, Location, CurrentWeatherData } from "./interface_weather";



// const Favourites : React.FC = () => <></>;

interface IFormInputs {
  location: string;
}
const Favourites = () => {
  const [location, setLocation] = useState("");
  const [favouriteLocation, setfavouriteLocation] = useState<{ favouriteCurrentLocation: RootCurrent[] }>();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
  }

  useEffect(() => {  CurrentWeather(); }, []);


  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <button type="submit">Get Favourite Location</button>
      </form>
      {favouriteLocation && (
        <ul className="container">
          {favouriteLocation.favouriteCurrentLocation.map((dataWeather: RootCurrent) => (
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
          ))}
        </ul>
      )}
    </div>
  );
};


export default Favourites;
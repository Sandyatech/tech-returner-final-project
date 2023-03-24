import React, { FormEvent } from 'react';
import CurrentWeather from './Current';
import { useForm } from "react-hook-form";

// const Favourites : React.FC = () => <></>;

interface IFormInputs {
    standard_weather: string;
}
const Favourites = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<IFormInputs>();

      const onSubmit = (data: IFormInputs) => {
        CurrentWeather(data);
      };
    

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <label>Favourite Weather</label>
        <input {...register("standard_weather")} placeholder="london" />
      <input type="submit" />
      </form>
    </div>
  );
};


export default Favourites;
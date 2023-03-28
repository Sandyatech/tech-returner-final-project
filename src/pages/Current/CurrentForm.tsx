import React from "react";
import { useCurrentLocation } from "../../hooks/CurrentLocationContext";
import { addCurrentLocationToLocalStorage } from "../../utils/storage";

interface LocationFormProps {
    handleSubmit: (location: string) => Promise<void>;
}

const LocationForm: React.FC<LocationFormProps> = ({ handleSubmit }) => {
    //const [location, setLocation] = React.useState("");
    const {currentLocation: location, setCurrentLocation: setLocation} = useCurrentLocation();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(location);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
        setLocation(e.target.value);        
        addCurrentLocationToLocalStorage(e.target.value);
    };

    return (
        <form onSubmit={onSubmit} className="form-container Current favourites-width">
            <input type="text" placeholder="Enter Location" onChange={onChange} />
            <button type="submit">Get Location Weather</button>
        </form>
    );
};

export default LocationForm;
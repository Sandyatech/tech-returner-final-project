
import { fireEvent, render, screen } from '@testing-library/react';
import LocationForm from "./CurrentForm"
import { useCurrentLocation } from "../../hooks/CurrentLocationContext";
import CurrentWeather from './Current';



test("Pass the valut in to Props", () => {

    const testInterfaceSNumberOfBeingsProps: LocationFormProps = {
        location: "London",
        handleSubmit: () => { },
    };
    render(<LocationForm{...testInterfaceSNumberOfBeingsProps} />);
    expect(screen.getByDisplayValue(testInterfaceSNumberOfBeingsProps.LocationForm)).toBeInTheDocument();

});
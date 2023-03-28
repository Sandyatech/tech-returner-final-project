import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LocationForm from './LocationForm';

describe('LocationForm component', () => {
    test('calls handleSubmit with the entered location', () => {
        const handleSubmit = jest.fn();
        render(<LocationForm handleSubmit={handleSubmit} />);

        const locationInput = screen.getByPlaceholderText('Enter Location');
        fireEvent.change(locationInput, { target: { value: 'New York' } });

        const submitButton = screen.getByRole('button', { name: 'Get Forcast' });
        fireEvent.click(submitButton);

        expect(handleSubmit).toHaveBeenCalledWith('New York');
    });
    test("calls handleSubmit prop with entered location when form is submitted", () => {
        const handleSubmitMock = jest.fn();
        render(<LocationForm handleSubmit={handleSubmitMock} />);
        const locationInput = screen.getByPlaceholderText("Enter Location");
        const submitButton = screen.getByRole("button", { name: "Get Forcast" });
        const enteredLocation = "New York";
        fireEvent.change(locationInput, { target: { value: enteredLocation } });
        fireEvent.click(submitButton);
        expect(handleSubmitMock).toHaveBeenCalledWith(enteredLocation);
    });
    test('renders a text input and a submit button', () => {
        const handleSubmit = jest.fn();
        render(<LocationForm handleSubmit={handleSubmit} />);
        const locationInput = screen.getByPlaceholderText('Enter Location');
        expect(locationInput).toBeInTheDocument();
        const submitButton = screen.getByRole('button', { name: 'Get Forcast' });
        expect(submitButton).toBeInTheDocument();
    });

});

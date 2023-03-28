import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CurrentWeather from './Current';

describe('Current component', () => {
    test('calls handleSubmit with the entered Current location', async() => {
        const handleSubmit = jest.fn();
        render(<CurrentWeather />);

        const locationInput = screen.getByPlaceholderText('Enter Location');
        fireEvent.change(locationInput, { target: { value: 'London' } });

        const submitButton = screen.getByRole('button', { name: 'Get Location Weather'});
        fireEvent.click(submitButton);
        expect(await screen.findByText('London')).toBeInTheDocument();
     });

    test('renders a Current Location text input and a submit button', () => {
        render(<CurrentWeather />);
        const locationInput = screen.getByPlaceholderText('Enter Location');
        expect(locationInput).toBeInTheDocument();
        const submitButton = screen.getByRole('button', { name: 'Get Location Weather' });
        expect(submitButton).toBeInTheDocument();
    });

});
import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard component', () => {
    test('renders a message when no weather data is available', () => {
        const day = {
            date: '2022-04-01',
            hour: []
        };
        render(<WeatherCard day={day} />);
        expect(screen.getByText('No weather data available.')).toBeInTheDocument();
    });
});

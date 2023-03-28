import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Favourites from './Favourites';

describe('Favourites component', () => {
    test('calls handleSubmit with the entered favourite location', async() => {
        const handleSubmit = jest.fn();
        render(<Favourites />);

        const locationInput = screen.getByPlaceholderText("Enter Favourite Location");
        fireEvent.change(locationInput, { target: { value: "Stockport" } });

        const submitButton = screen.getByRole("button", { name: "Get Favourite Location"});
        fireEvent.click(submitButton);
        expect(await screen.findByText(/Stockport/i)).toBeInTheDocument();
     });

    test('renders a favourites text input and a submit button', () => {
        render(<Favourites />);
        const locationInput = screen.getByPlaceholderText('Enter Favourite Location');
        expect(locationInput).toBeInTheDocument();
        const submitButton = screen.getByRole('button', { name: 'Get Favourite Location' });
        expect(submitButton).toBeInTheDocument();
    });

});
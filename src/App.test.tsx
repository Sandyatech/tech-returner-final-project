import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import App from './App';

test('App renders and user can navigate', async () => {
    render(<App />);
    const user = userEvent.setup();

    // default route   
    expect(await screen.findByText(/Get Location Weather/i)).toBeInTheDocument();

    // // Forecast route
    act(() => {
        user.click(screen.getByText(/Forecast/i, { selector: 'a' }))
    });
    expect(await screen.findByRole('button', {
        name: /Get Forcast/i
    })).toBeInTheDocument();

    // // Historical route
    // act(() => {
    //     user.click(screen.getByText(/Historical/i, { selector: 'a'}))
    // });
    // expect(await screen.findByText(/History Weather/i)).toBeInTheDocument();

    // Health route
    act(() => {
        user.click(screen.getByText(/Health/i, { selector: 'a' }))
    });
    expect(await screen.findByText(/API/i)).toBeInTheDocument();

});


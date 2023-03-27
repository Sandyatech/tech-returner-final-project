import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Router from './Router';
import { MemoryRouter } from 'react-router-dom';


test('landing on a bad page', () => {
    const badRoute = '/some/bad/route'
      
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Router />
      </MemoryRouter>,    
    )
    expect(screen.getByText(/404: Page not found./i)).toBeInTheDocument();
});
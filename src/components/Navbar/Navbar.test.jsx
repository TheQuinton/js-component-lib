import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

// A small wrapper component to expose current route
const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
};

describe('Navbar', () => {
    test('renders both navigation links', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Collapsible Panel/i)).toBeInTheDocument();
        expect(screen.getByText(/String Array Transformer/i)).toBeInTheDocument();
    });

    test('navigates to home route when Home link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/collapsible']}>
                <Navbar />
                <LocationDisplay />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Home/i));
        const locationDisplay = screen.getByTestId('location');

        expect(locationDisplay).toHaveTextContent('/');
    });

    test('navigates to /collapsible route when link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Navbar />
                <LocationDisplay />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Collapsible Panel/i));
        const locationDisplay = screen.getByTestId('location');

        expect(locationDisplay).toHaveTextContent('/collapsible');
    });

    test('navigates to /transformer route when link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Navbar />
                <LocationDisplay />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/String Array Transformer/i));
        const locationDisplay = screen.getByTestId('location');

        expect(locationDisplay).toHaveTextContent('/transformer');
    });
});
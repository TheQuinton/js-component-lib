import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ImageLoader from './ImageLoader';

// Mock URL.createObjectURL globally
window.URL = {
    createObjectURL: jest.fn(() => 'mocked-blob-url'),
};

// Ensure fetch is available
if (!window.fetch) {
    window.fetch = jest.fn();
}

describe('ImageLoader', () => {
    const validJsonUrl = 'https://example.com/data.json';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        // Mock fetch to never resolve
        window.fetch.mockImplementationOnce(() => new Promise(() => { }));

        render(<ImageLoader jsonUrl={validJsonUrl} />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('loads and displays image successfully', async () => {
        // Mock JSON response
        const mockImageUrl = 'https://placehold.co/600x400';

        // Simulate successful JSON + image load
        window.fetch
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ imageUrl: mockImageUrl }),
                })
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    blob: () => Promise.resolve(new Blob([], { type: 'image/jpeg' })),
                })
            );

        render(<ImageLoader jsonUrl={validJsonUrl} />);

        await waitFor(() => {
            expect(screen.getByAltText('Loaded from JSON')).toBeInTheDocument();
        });

        const img = screen.getByAltText('Loaded from JSON');
        expect(img).toHaveAttribute('src', 'mocked-blob-url'); // From mocked URL.createObjectURL
    });

    test('handles error when JSON fails to load', async () => {
        // Mock JSON fetch failure
        window.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

        render(<ImageLoader jsonUrl="https://example.com/data.json" />);

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });

    test('handles error when JSON has no imageUrl', async () => {
        // Mock empty JSON
        window.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        render(<ImageLoader jsonUrl="https://example.com/data.json" />);

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/image url not found/i)).toBeInTheDocument();
    });

    test('handles error when image fetch fails', async () => {
        // Mock JSON success but image fetch failure
        window.fetch
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ imageUrl: 'https://example.com/image.jpg' }),
                })
            )
            .mockImplementationOnce(() => Promise.reject(new Error('Image fetch failed')));

        render(<ImageLoader jsonUrl="https://example.com/data.json" />);

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/image fetch failed/i)).toBeInTheDocument();
    });
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageLoaderPage from './ImageLoaderPage';

describe('ImageLoaderPage', () => {
    test('displays uploaded image URL from valid JSON file', async () => {
        render(<ImageLoaderPage />);

        const file = new File(
            [JSON.stringify({ imageUrl: 'https://via.placeholder.com/150x150' })],
            'test.json',
            { type: 'application/json' }
        );

        const input = screen.getByLabelText(/browse files/i);

        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByAltText('Loaded from JSON')).toBeInTheDocument();
        });

        expect(screen.getByAltText('Loaded from JSON')).toHaveAttribute(
            'src',
            'https://via.placeholder.com/150x150'
        );
    });

    test('shows error if uploaded JSON has no imageUrl field', async () => {
        render(<ImageLoaderPage />);

        const file = new File(
            [JSON.stringify({ error: 'no imageUrl found' })],
            'invalid.json',
            { type: 'application/json' }
        );

        const input = screen.getByLabelText(/browse files/i);
        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.getByText(/json does not contain "imageUrl" field/i)).toBeInTheDocument();
        });
    });

    test('shows error when dropped JSON has no imageUrl', async () => {
        render(<ImageLoaderPage />);

        const file = new File(
            [JSON.stringify({ error: 'no imageUrl found' })],
            'invalid.json',
            { type: 'application/json' }
        );

        const dropZone = screen.getByTestId('drop-zone');

        fireEvent.drop(dropZone, {
            dataTransfer: { files: [file] },
        });

        await waitFor(() => {
            expect(screen.getByText(/json does not contain "imageUrl" field/i)).toBeInTheDocument();
        });
    });

    test('loads image from dropped JSON file', async () => {
        render(<ImageLoaderPage />);

        const file = new File(
            [JSON.stringify({ imageUrl: 'https://via.placeholder.com/300x200' })],
            'test.json',
            { type: 'application/json' }
        );

        const dropZone = screen.getByTestId('drop-zone');

        fireEvent.drop(dropZone, {
            dataTransfer: { files: [file] },
        });

        await waitFor(() => {
            expect(screen.getByAltText('Loaded from JSON')).toBeInTheDocument();
        });

        expect(screen.getByAltText('Loaded from JSON')).toHaveAttribute(
            'src',
            'https://via.placeholder.com/300x200'
        );
    });

    test('shows error when dropped file is not JSON', async () => {
        render(<ImageLoaderPage />);

        const textFile = new File(['plain text'], 'text.txt', { type: 'text/plain' });

        const dropZone = screen.getByTestId('drop-zone');

        fireEvent.drop(dropZone, {
            dataTransfer: { files: [textFile] },
        });

        await waitFor(() => {
            expect(screen.getByText(/please upload a valid json file/i)).toBeInTheDocument();
        });
    });

    test('renders drag-and-drop zone and label', () => {
        render(<ImageLoaderPage />);
        expect(screen.getByText(/drag & drop json file here/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/browse files/i)).toBeInTheDocument();
    });
});
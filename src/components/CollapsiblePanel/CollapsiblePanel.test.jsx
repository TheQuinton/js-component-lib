import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CollapsiblePanel from './CollapsiblePanel';

describe('CollapsiblePanel', () => {
    const defaultProps = {
        title: 'Test Title',
        children: <p>Panel Content</p>,
    };

    test('renders title and does not show content by default', () => {
        render(<CollapsiblePanel {...defaultProps} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Panel Content')).not.toBeVisible();
    });

    test('shows content when clicked', () => {
        render(<CollapsiblePanel {...defaultProps} />);

        const header = screen.getByText('Test Title');
        fireEvent.click(header);

        expect(screen.getByText('Panel Content')).toBeVisible();
    });

    test('hides content after clicking again', () => {
        render(<CollapsiblePanel {...defaultProps} />);

        const header = screen.getByText('Test Title');
        fireEvent.click(header); // Open
        fireEvent.click(header); // Close

        expect(screen.getByText('Panel Content')).not.toBeVisible();
    });

    test('renders content when defaultOpen is true', () => {
        render(<CollapsiblePanel {...defaultProps} defaultOpen={true} />);

        expect(screen.getByText('Panel Content')).toBeVisible();
    });
});
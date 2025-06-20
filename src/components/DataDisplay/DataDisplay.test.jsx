import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DataDisplay from './DataDisplay';

// Ensure fetch exists on window
if (!window.fetch) {
  window.fetch = jest.fn();
}

describe('DataDisplay', () => {
  beforeEach(() => {
    // Always reset and mock fetch
    jest.clearAllMocks();
    window.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
          { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
          { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
        ])
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders loading state initially', async () => {
    // Override fetch to never resolve
    window.fetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<DataDisplay apiUrl="https://api.example.com/data"  />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders data successfully from API', async () => {
    render(<DataDisplay apiUrl="https://api.example.com/data"  />);

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });
  });

  test('renders error message on failed request', async () => {
    window.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network response was not ok'))
    );

    render(<DataDisplay apiUrl="https://api.example.com/data"  />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test('sorts data alphabetically when autoSort is true', async () => {
    const unsortedUsers = [
      { id: 3, name: 'Charlie Brown' },
      { id: 1, name: 'Alice Smith' },
      { id: 2, name: 'Bob Johnson' }
    ];

    window.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(unsortedUsers),
      })
    );

    render(<DataDisplay apiUrl="https://api.example.com/data"  autoSort={true} />);

    await waitFor(() => {
      const firstItem = screen.getAllByText(/^([A-Z][a-z]+ [A-Z][a-z]+)/)[0];
      expect(firstItem).toHaveTextContent('Alice Smith');
    });

    const items = screen.getAllByText(/^([A-Z][a-z]+ [A-Z][a-z]+)/);
    expect(items[0]).toHaveTextContent('Alice Smith');
    expect(items[1]).toHaveTextContent('Bob Johnson');
    expect(items[2]).toHaveTextContent('Charlie Brown');
  });

  test('filters data based on search input', async () => {
    render(<DataDisplay apiUrl="https://api.example.com/data"  />);

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/search by name/i);
    fireEvent.change(input, { target: { value: 'Charlie' } });

    await waitFor(() => {
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });

    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
  });
});
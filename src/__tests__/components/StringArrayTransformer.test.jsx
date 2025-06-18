import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StringArrayTransformer from '../../components/StringArrayTransformer';

describe('StringArrayTransformer', () => {
  test('renders initial UI and parses input correctly', () => {
    render(<StringArrayTransformer />);

    // Check if input field and buttons exist
    expect(screen.getByPlaceholderText(/apple, banana, cherry/i)).toBeInTheDocument();
    expect(screen.getByText(/Parse/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort/i)).toBeInTheDocument();
    expect(screen.getByText(/Shuffle/i)).toBeInTheDocument();

    // Simulate typing and submitting
    const input = screen.getByPlaceholderText(/apple, banana, cherry/i);
    fireEvent.change(input, { target: { value: 'apple, banana, cherry' } });
    fireEvent.click(screen.getByText(/Parse/i));

    // Check transformed output
    expect(screen.getByText('APPLE')).toBeInTheDocument();
    expect(screen.getByText('BANANA')).toBeInTheDocument();
    expect(screen.getByText('CHERRY')).toBeInTheDocument();
  });

  test('transforms strings to lowercase when selected', () => {
    render(<StringArrayTransformer />);

    const input = screen.getByPlaceholderText(/apple, banana, cherry/i);
    fireEvent.change(input, { target: { value: 'Apple, BANANA, Cherry' } });
    fireEvent.click(screen.getByText(/Parse/i));

    const transformSelect = screen.getByRole('combobox');
    fireEvent.change(transformSelect, { target: { value: 'lowercase' } });

    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('cherry')).toBeInTheDocument();
  });

  test('reverses strings when selected', () => {
    render(<StringArrayTransformer />);

    const input = screen.getByPlaceholderText(/apple, banana, cherry/i);
    fireEvent.change(input, { target: { value: 'hello,world' } });
    fireEvent.click(screen.getByText(/Parse/i));

    const transformSelect = screen.getByRole('combobox');
    fireEvent.change(transformSelect, { target: { value: 'reverse' } });

    expect(screen.getByText('olleh')).toBeInTheDocument();
    expect(screen.getByText('dlrow')).toBeInTheDocument();
  });

  test('sorts array alphabetically', () => {
    render(<StringArrayTransformer />);

    const input = screen.getByPlaceholderText(/apple, banana, cherry/i);
    fireEvent.change(input, { target: { value: 'banana, apple, cherry' } });
    fireEvent.click(screen.getByText(/Parse/i));

    fireEvent.click(screen.getByText(/Sort/i));

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('APPLE');
    expect(listItems[1]).toHaveTextContent('BANANA');
    expect(listItems[2]).toHaveTextContent('CHERRY');
  });

  test('shuffles array randomly', () => {
    render(<StringArrayTransformer />);

    const input = screen.getByPlaceholderText(/apple, banana, cherry/i);
    fireEvent.change(input, { target: { value: 'apple, banana, cherry' } });
    fireEvent.click(screen.getByText(/Parse/i));

    fireEvent.click(screen.getByText(/Shuffle/i));

    const listItems = screen.getAllByRole('listitem');
    const texts = listItems.map((li) => li.textContent);

    // Since shuffle is random, just ensure order has changed
    expect(texts).not.toEqual(['APPLE', 'BANANA', 'CHERRY']);
  });

  test('removes an item from the list', () => {
    render(<StringArrayTransformer />);

    const input = screen.getByPlaceholderText(/apple, banana, cherry/i);
    fireEvent.change(input, { target: { value: 'apple, banana, cherry' } });
    fireEvent.click(screen.getByText(/Parse/i));

    // Click remove button on first item
    const removeButtons = screen.getAllByText('❌');
    fireEvent.click(removeButtons[0]);

    expect(screen.queryByText('APPLE')).not.toBeInTheDocument();
    expect(screen.getByText('BANANA')).toBeInTheDocument();
    expect(screen.getByText('CHERRY')).toBeInTheDocument();
  });
});
import { useState } from 'react';

// Custom hook to handle input parsing and validation
const useInputParser = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const parseInput = (value) => {
    try {
      if (!value.trim()) throw new Error('Input cannot be empty');

      const parsed = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      if (parsed.length === 0) throw new Error('No valid items found');

      setError('');
      return parsed;
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  return {
    input,
    setInput,
    error,
    parseInput,
  };
};

// Custom hook to manage array state and transformations
const useArrayOperations = (initialValue = []) => {
  const [array, setArray] = useState(initialValue);

  const transformModeMap = {
    uppercase: (val) => val.toUpperCase(),
    lowercase: (val) => val.toLowerCase(),
    reverse: (val) => val.split('').reverse().join(''),
  };

  const sortArray = () =>
    setArray([...array].sort((a, b) => a.localeCompare(b)));

  const shuffleArray = () => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setArray(newArray);
  };

  const removeItem = (index) =>
    setArray(array.filter((_, i) => i !== index));

  const addItem = (item) =>
    setArray([...array, item]);

  return {
    array,
    setArray,
    sortArray,
    shuffleArray,
    removeItem,
    addItem,
    transformModeMap,
  };
};

export { useInputParser, useArrayOperations };
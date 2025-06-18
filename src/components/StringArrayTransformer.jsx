import { useState } from 'react';
import PropTypes from 'prop-types';
import { useInputParser, useArrayOperations } from '../hooks/useStringArrayTransformer';

const StringArrayTransformer = ({ initialItems = [] }) => {
  const { input, setInput, error, parseInput } = useInputParser();
  const arrayOps = useArrayOperations(initialItems);

  const handleParse = (e) => {
    e.preventDefault();
    const result = parseInput(input);
    if (result.length > 0) {
      arrayOps.setArray(result);
    }
  };

  const [transformMode, setTransformMode] = useState('uppercase');

  const transformedArray = arrayOps.array.map(
    arrayOps.transformModeMap[transformMode]
  );

  const arrayToObject = transformedArray.reduce((obj, val, idx) => {
    obj[idx] = val;
    return obj;
  }, {});

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h2>String Array Transformer</h2>
      <form onSubmit={handleParse}>
        <label>
          Enter comma-separated strings:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="apple, banana, cherry"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </label>
        <button type="submit" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}>
          Parse
        </button>
        <button
          type="button"
          onClick={arrayOps.sortArray}
          style={{ marginRight: '0.5rem' }}
        >
          Sort
        </button>
        <button type="button" onClick={arrayOps.shuffleArray}>Shuffle</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {arrayOps.array.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Transform Options</h3>
          <select
            value={transformMode}
            onChange={(e) => setTransformMode(e.target.value)}
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="reverse">Reverse</option>
          </select>

          <h3>Transformed List</h3>
          <ul style={{ listStyleType: 'none' }}>
            {transformedArray.map((item, index) => (
              <li key={index}>
                {item}{' '}
                <button
                  type="button"
                  onClick={() => arrayOps.removeItem(index)}
                  style={{ marginLeft: '0.5rem', color: 'red' }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <h3>Index → Value Object</h3>
          <pre style={{ background: '#f4f4f4', padding: '0.5rem' }}>
            {JSON.stringify(arrayToObject, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

StringArrayTransformer.propTypes = {
  initialItems: PropTypes.arrayOf(PropTypes.string),
};

StringArrayTransformer.defaultProps = {
  initialItems: [],
};

export default StringArrayTransformer;
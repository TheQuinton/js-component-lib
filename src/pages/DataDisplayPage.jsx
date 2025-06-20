import React, { useState } from 'react';
import DataDisplay from '../components/DataDisplay/DataDisplay';

const DataDisplayPage = () => {
  const [apiUrl, setApiUrl] = useState('https://jsonplaceholder.typicode.com/users'); 
  const [sorted, setSorted] = useState();

  const handleFetch = () => {
    setApiUrl(prev => prev); // Trigger re-fetch by resetting state
  };

  const handleSort = () => {
    // You can integrate sorting directly into the component or pass a prop
    setSorted(prev => !prev); 
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>API Data Viewer</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleFetch}>Fetch Users</button>
        <button onClick={handleSort}>
          {sorted ? 'Disable Sorting' : 'Enable Sorting'}
        </button>
      </div>
      <DataDisplay apiUrl={apiUrl} autoSort={sorted}/>
    </div>
  );
}

export default DataDisplayPage;
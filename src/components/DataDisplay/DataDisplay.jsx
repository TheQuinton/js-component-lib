import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DataDisplay.css';

const DataDisplay = ({ apiUrl, autoSort = false }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const sorted = autoSort;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    const sortedData = sorted
        ? [...data].sort((a, b) => (a.name || '').localeCompare(b.name || ''))
        : data;

    const filteredData = searchTerm
        ? sortedData.filter(item => (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()))
        : sortedData;

    // Transform data (example: extract user names and emails)
    //   const processedData = data.map(item => ({
    //     id: item.id,
    //     name: item.name || item.title, // Different APIs might have different keys
    //     email: item.email
    //   }));

    if (loading) {
        return <div className="loading">Loading data...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    //   return (
    //     <div className="data-container">
    //       <h2>API Data Display</h2>
    //       <p>Fetched from: {apiUrl}</p>
    //       <ul className="data-list">
    //         {processedData.map(item => (
    //           <li key={item.id} className="data-item">
    //             <strong>{item.name}</strong>
    //             {item.email && <span> - {item.email}</span>}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   );
    return (
        <div>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '0.5rem', width: '100%' }}
                />
            </div>

            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {filteredData.map(item => (
                    <li key={item.id} style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
                        <strong>{item.name || item.title}</strong>
                        {item.email && <span> - {item.email}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Default props for development/testing
DataDisplay.defaultProps = {
    apiUrl: 'https://jsonplaceholder.typicode.com/users'
};

// Type checking with PropTypes
DataDisplay.propTypes = {
    apiUrl: PropTypes.string.isRequired,
    autoSort: PropTypes.bool,
};

export default DataDisplay;
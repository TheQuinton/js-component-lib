import React, { useState } from 'react';
import ImageLoader from '../components/ImageLoader/ImageLoader';

const ImageLoaderPage = () => {
    const [jsonFile, setJsonFile] = useState(null);
    const [jsonError, setJsonError] = useState('');

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target.result);
                if (!json.imageUrl) {
                    throw new Error('JSON does not contain "imageUrl" field');
                }
                setJsonFile(json);
                setJsonError('');
            } catch (err) {
                setJsonError(err.message);
                setJsonFile(null);
            }
        };
        reader.readAsText(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            handleFile(file);
        } else {
            setJsonError('Please upload a valid JSON file.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Image Loader</h1>
            <p>Loads image URL from JSON and displays it below.</p>

            {/* File Upload Section */}
            <div
                data-testid="drop-zone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    cursor: 'pointer'
                }}
            >
                <h3>Drag & Drop JSON File Here</h3>
                <p>or click to select file</p>
                <input
                    type="file"
                    accept=".json"
                    onChange={(e) => handleFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="file-upload"
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', color: '#007acc' }}>
                    Browse Files
                </label>
            </div>

            {jsonError && <p style={{ color: 'red', marginTop: '1rem' }}>{jsonError}</p>}

            <hr style={{ margin: '2rem 0' }} />

            {jsonFile ? (
                <div>
                    <h2>Loaded Image</h2>
                    <img
                        src={jsonFile.imageUrl}
                        alt="Loaded from JSON"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>
            ) : (
                <ImageLoader jsonUrl="/data.json" />
            )}
        </div>
    );
};

export default ImageLoaderPage;
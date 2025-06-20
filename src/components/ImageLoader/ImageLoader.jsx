import React from 'react';
import useImageLoader from '../../hooks/useImageLoader';

const ImageLoader = ({ jsonUrl }) => {
    const { imageSrc, loading, error } = useImageLoader(jsonUrl);

    if (loading) return <div>Loading image...</div>;
    if (error)
        return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
            <h2>Loaded Image</h2>
            <img src={imageSrc} alt="Loaded from JSON" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
    );
};

export default ImageLoader;
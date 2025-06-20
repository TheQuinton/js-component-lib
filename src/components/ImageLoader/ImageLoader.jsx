import React, { useState, useEffect } from 'react';

const ImageLoader = ({ jsonUrl }) => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch JSON file
        const jsonRes = await fetch(jsonUrl);
        if (!jsonRes.ok) throw new Error(`Failed to load JSON: ${jsonRes.statusText}`);
        const jsonData = await jsonRes.json();

        // Step 2: Extract image URL from JSON
        const imageUrl = jsonData.imageUrl;
        if (!imageUrl) throw new Error('Image URL not found in JSON');

        // Step 3: Fetch actual image as blob
        const imageRes = await fetch(imageUrl);
        if (!imageRes.ok) throw new Error(`Failed to fetch image: ${imageRes.statusText}`);

        const blob = await imageRes.blob();
        const objectUrl = URL.createObjectURL(blob);

        // Step 4: Set state and clean up old URLs
        setImageData(objectUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jsonUrl]);

  if (loading) return <div>Loading image...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Loaded Image</h2>
      <img src={imageData} alt="Loaded from JSON" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default ImageLoader;
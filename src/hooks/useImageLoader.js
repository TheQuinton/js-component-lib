import { useState, useEffect } from 'react';

const useImageLoader = (jsonUrl) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadImageFromJson = async () => {
            try {
                // Step 1: Fetch JSON
                const jsonRes = await fetch(jsonUrl);
                if (!jsonRes.ok) throw new Error(`Failed to load JSON: ${jsonRes.statusText}`);
                const jsonData = await jsonRes.json();

                // Step 2: Get imageUrl from JSON
                const imageUrl = jsonData.imageUrl;
                if (!imageUrl) throw new Error('Image URL not found in JSON');

                // Step 3: Fetch image
                const imageRes = await fetch(imageUrl);
                if (!imageRes.ok) throw new Error(`Failed to fetch image: ${imageRes.statusText}`);

                const blob = await imageRes.blob();
                const objectUrl = URL.createObjectURL(blob);

                setImageSrc(objectUrl);
                setError(null);
            } catch (err) {
                setError(err.message);
                setImageSrc(null);
            } finally {
                setLoading(false);
            }
        };

        loadImageFromJson();
    }, [jsonUrl]);

    return { imageSrc, loading, error };
};

export default useImageLoader;
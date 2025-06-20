import ImageLoader from '../components/ImageLoader/ImageLoader';

const ImageLoaderPage = () => {
    return (
        <div>
            <h1>Image Loader Demo</h1>
            <ImageLoader jsonUrl="/data.json" />
        </div>
    );
};

export default ImageLoaderPage;

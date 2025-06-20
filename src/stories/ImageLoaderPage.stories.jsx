import React from 'react';
import ImageLoaderPage from '../pages/ImageLoaderPage';

export default {
    title: 'Pages/ImageLoaderPage',
    component: ImageLoaderPage,
};

const Template = () => <ImageLoaderPage />;

export const Default = Template.bind({});
Default.parameters = {
    docs: {
        description: {
            story: 'Renders a page that loads an image dynamically from JSON data.',
        },
    },
};
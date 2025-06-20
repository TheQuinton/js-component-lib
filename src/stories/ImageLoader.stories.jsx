import React from 'react';
import ImageLoader from '../components/ImageLoader/ImageLoader';

export default {
    title: 'Components/ImageLoader',
    component: ImageLoader,
    argTypes: {
        jsonUrl: {
            control: 'text',
            description: 'URL to fetch JSON file containing "imageUrl"'
        }
    },
    parameters: {
        layout: 'centered'
    }
};

// Template for reuse
const Template = (args) => <ImageLoader {...args} />;

// Default story using a valid JSON URL
export const Default = Template.bind({});
Default.args = {
    jsonUrl: '/data.json', // Assumes data.json exists in public/
};
Default.parameters = {
    docs: {
        description: {
            story: 'Loads image URL from JSON file and displays the image.'
        }
    }
};

// Simulates loading state
export const LoadingState = Template.bind({});
LoadingState.args = {
    jsonUrl: '/loading-data.json' // This can be mocked by not resolving in Storybook preview
};
LoadingState.parameters = {
    docs: {
        description: {
            story: 'Displays loading state while fetching JSON or image.'
        }
    }
};

// Simulates error when JSON is missing or invalid
export const ErrorState = Template.bind({});
ErrorState.args = {
    jsonUrl: '/invalid-json.json'
};
ErrorState.parameters = {
    docs: {
        description: {
            story: 'Displays an error message if JSON or image fails to load.'
        }
    }
};

// Simulates missing imageUrl field in JSON
export const MissingImageUrl = Template.bind({});
MissingImageUrl.args = {
    jsonUrl: '/json-missing-image-url.json'
};
MissingImageUrl.parameters = {
    docs: {
        description: {
            story: 'Shows error when JSON does not contain an "imageUrl" field.'
        }
    }
};
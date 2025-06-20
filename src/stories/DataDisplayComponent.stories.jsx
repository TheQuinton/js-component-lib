import React from 'react';
import DataDisplay from './DataDisplay';

export default {
  title: 'Components/DataDisplay',
  component: DataDisplay,
  argTypes: {
    apiUrl: {
      control: 'text',
      description: 'URL to fetch JSON data from'
    },
    autoSort: {
      control: 'boolean',
      description: 'Whether to sort the list alphabetically by name/title'
    }
  },
};

// Template for reuse across stories
const Template = (args) => <DataDisplay {...args} />;

// Default story using a public API
export const Default = Template.bind({});
Default.args = {
  apiUrl: 'https://jsonplaceholder.typicode.com/users', 
  autoSort: false,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default usage of the component fetching user data from a public API.',
    },
  },
};

// Auto-sorted version
export const Sorted = Template.bind({});
Sorted.args = {
  apiUrl: 'https://jsonplaceholder.typicode.com/users', 
  autoSort: true,
};
Sorted.parameters = {
  docs: {
    description: {
      story: 'Displays data sorted alphabetically by name.',
    },
  },
};

// Loading state simulation
export const Loading = () => (
  <DataDisplay
    apiUrl="https://jsonplaceholder.typicode.com/users" 
    autoSort={false}
  />
);
Loading.parameters = {
  chromatic: { disable: true }, // Optional: skip visual tests on this
  docs: {
    description: {
      story: 'Simulates the loading state of the component.',
    },
  },
};

// Error state simulation
export const ErrorState = () => (
  <DataDisplay
    apiUrl="https://invalid-url-for-error-test.com/data" 
    autoSort={false}
  />
);
ErrorState.parameters = {
  chromatic: { disable: true },
  docs: {
    description: {
      story: 'Shows the error message when the API request fails.',
    },
  },
};
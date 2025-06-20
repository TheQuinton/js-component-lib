import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

export default {
    title: 'Components/Navbar',
    component: Navbar,
    decorators: [
        (Story) => (
            <Router>
                <Story />
            </Router>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = () => <Navbar />;

export const Default = Template.bind({});
Default.parameters = {
    docs: {
        description: {
            story: 'The main navigation bar with links to different sections of the app.',
        },
    },
};
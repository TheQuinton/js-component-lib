import React from 'react';
import CollapsiblePanel from '../components/CollapsiblePanel/CollapsiblePanel';

export default {
    title: 'Components/CollapsiblePanel',
    component: CollapsiblePanel,
    argTypes: {
        title: {
            control: 'text',
            description: 'Title of the collapsible panel',
        },
        defaultOpen: {
            control: 'boolean',
            description: 'Whether the panel is open by default',
        },
        children: {
            control: 'text',
            description: 'Content inside the panel',
        },
    },
};

const Template = (args) => <CollapsiblePanel {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Click to expand',
    children: 'This is the collapsible content.',
};

export const InitiallyOpen = Template.bind({});
InitiallyOpen.args = {
    ...Default.args,
    defaultOpen: true,
};

export const LongContent = Template.bind({});
LongContent.args = {
    title: 'More Details',
    children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus ac nunc nec nulla tempor fermentum. Donec vitae semper nisi.',
};
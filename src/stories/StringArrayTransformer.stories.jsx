import React from 'react';
import StringArrayTransformer from '../components/StringArrayTransformer/StringArrayTransformer';

export default {
  title: 'Components/StringArrayTransformer',
  component: StringArrayTransformer,
  argTypes: {},
};

const Template = (args) => <StringArrayTransformer {...args} />;

export const EmptyState = Template.bind({});
EmptyState.args = {};

export const WithInitialData = Template.bind({});
WithInitialData.args = {
  initialItems: ['apple', 'banana', 'cherry'],
};
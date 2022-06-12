import { ListItem } from '../../index';

export default {
  title: 'Components/ListItem',
  component: ListItem,
};

const Template = (args) => (
  <ListItem {...args}>Tellus Ullamcorper Inceptos</ListItem>
);

export const GradientRed = Template.bind({});
GradientRed.args = {
  color: 'linear-gradient(90deg, #911812 0%, #E1261C 100%)',
};

export const GradientWhite = Template.bind({});
GradientWhite.args = {
  color: 'linear-gradient(90deg, #D3DAE8 0%, #A7B7D8 100%)',
};
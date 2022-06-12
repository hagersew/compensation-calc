import { Button, Divider, notification, Checkbox, Input } from 'antd';
import { CompensationCard } from '../../index';
import './../styles/card.css';

export default {
  title: 'Components/CompensationCard',
  component: CompensationCard,
};

const AverageInputTemplate = (args) => (
  <Input
    title="Average income"
    className="font-bold text-2xl input-gradient"
    suffix={'€'}
  ></Input>
);

const DaysSickLeaveInputTemplate = (args) => (
          <Input
            title="Days on sick-leave"
            className="font-bold text-2xl h-11 input-gradient -mt-4"
            suffix={'days'}
          ></Input>
);

const checkboxTemplate = (args) => <Checkbox>I have tubercolosis</Checkbox>;

const calculateButtonTemplate = (args) => (
  <Button
    style={{
      background: 'linear-gradient(90deg, #911812 0%, #E1261C 100%)',
      height: '60px',
    }}
    className="w-40 mt-2"
    shape="round"
    size="large"
  >
    <p className="text-1xl text-center mt-2 font-bold text-white">Calculate</p>
  </Button>
);

export const averageIncomeBtn = AverageInputTemplate.bind({});
export const daysSickLeaveBtn = DaysSickLeaveInputTemplate.bind({});
export const checkbox = checkboxTemplate.bind({});
export const calculateBtn = calculateButtonTemplate.bind({});

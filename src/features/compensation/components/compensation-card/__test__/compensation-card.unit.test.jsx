import { fireEvent, render, screen } from '@testing-library/react';
import { CompensationCard } from '../../index';

it('should render a button with label calculate', () => {
  render(<CompensationCard />);

  const calculateBtn = screen.getByTestId('calcButton', {
    name: /primary button/i,
  });
  expect(calculateBtn).toBeInTheDocument();
});

it('should employer to return a value', () => {
  render(<CompensationCard />);
  const getSickLeave = screen.getByTestId('getSickLeave');
  const handleAverageIncome = screen.getByTestId('handleAverageIncome');

  fireEvent.change(getSickLeave, { target: { value: '7' } });
  fireEvent.change(handleAverageIncome, { target: { value: '1500' } });

  const employerCompDays = screen.getByTestId('employerCompDays');
  const employerComp = screen.getByTestId('employerComp');
  const totalCompensation = screen.getByTestId('totalCompensation');
  const calculateBtn = screen.getByTestId('calcButton');

  fireEvent.click(calculateBtn);

  expect(employerCompDays).toHaveTextContent('4 days');
  expect(employerComp).toHaveTextContent('112€');
  expect(totalCompensation).toHaveTextContent('112€');
});

it('should employer and insurance to return a value', () => {
  render(<CompensationCard />);
  const getSickLeave = screen.getByTestId('getSickLeave');
  const handleAverageIncome = screen.getByTestId('handleAverageIncome');

  fireEvent.change(getSickLeave, { target: { value: '170' } });
  fireEvent.change(handleAverageIncome, { target: { value: '1500' } });

  const employerCompDays = screen.getByTestId('employerCompDays');
  const employerComp = screen.getByTestId('employerComp');
  const insuranceCompDays = screen.getByTestId('insuranceCompDays');
  const insuranceComp = screen.getByTestId('insuranceComp');
  const sickDays = screen.getByTestId('sickDays');
  const totalCompensation = screen.getByTestId('totalCompensation');
  const calculateBtn = screen.getByTestId('calcButton');

  fireEvent.click(calculateBtn);

  expect(employerCompDays).toHaveTextContent('4 days');
  expect(employerComp).toHaveTextContent('149€');
  expect(insuranceCompDays).toHaveTextContent('162 days');
  expect(insuranceComp).toHaveTextContent('6074€');
  expect(sickDays).toHaveTextContent('170');
  expect(totalCompensation).toHaveTextContent('6223€');
});

it('should employer and insurance to return a value with TB checked', () => {
  render(<CompensationCard />);
  const getSickLeave = screen.getByTestId('getSickLeave');
  const handleAverageIncome = screen.getByTestId('handleAverageIncome');
  const handleHaveTB = screen.getByTestId('handleHaveTB');

  fireEvent.change(getSickLeave, { target: { value: '190' } });
  fireEvent.change(handleAverageIncome, { target: { value: '1500' } });
  fireEvent.click(handleHaveTB);

  const employerCompDays = screen.getByTestId('employerCompDays');
  const employerComp = screen.getByTestId('employerComp');
  const insuranceCompDays = screen.getByTestId('insuranceCompDays');
  const insuranceComp = screen.getByTestId('insuranceComp');
  const sickDays = screen.getByTestId('sickDays');
  const totalCompensation = screen.getByTestId('totalCompensation');
  const calculateBtn = screen.getByTestId('calcButton');

  fireEvent.click(calculateBtn);

  expect(employerCompDays).toHaveTextContent('4 days');
  expect(employerComp).toHaveTextContent('149€');
  expect(insuranceCompDays).toHaveTextContent('182 days');
  expect(insuranceComp).toHaveTextContent('6824€');
  expect(sickDays).toHaveTextContent('190');
  expect(totalCompensation).toHaveTextContent('6973€');
});

it('should employer and insurance to return a 0 with TB checked', () => {
  render(<CompensationCard />);
  const getSickLeave = screen.getByTestId('getSickLeave');
  const handleAverageIncome = screen.getByTestId('handleAverageIncome');
  const handleHaveTB = screen.getByTestId('handleHaveTB');

  fireEvent.change(getSickLeave, { target: { value: '242' } });
  fireEvent.change(handleAverageIncome, { target: { value: '1500' } });
  fireEvent.click(handleHaveTB);

  const employerCompDays = screen.getByTestId('employerCompDays');
  const employerComp = screen.getByTestId('employerComp');
  const insuranceCompDays = screen.getByTestId('insuranceCompDays');
  const insuranceComp = screen.getByTestId('insuranceComp');
  const sickDays = screen.getByTestId('sickDays');
  const totalCompensation = screen.getByTestId('totalCompensation');
  const calculateBtn = screen.getByTestId('calcButton');

  fireEvent.click(calculateBtn);

  expect(employerCompDays).toHaveTextContent('0 days');
  expect(employerComp).toHaveTextContent('0€');
  expect(insuranceCompDays).toHaveTextContent('0 days');
  expect(insuranceComp).toHaveTextContent('0€');
  expect(sickDays).toHaveTextContent('242');
  expect(totalCompensation).toHaveTextContent('0€');
});

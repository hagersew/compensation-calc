import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import './styles/card.css';
import { Button, Divider, notification, Checkbox, Input } from 'antd';

// Maximum number of days insurance compensates
const MAX_TB_SICK_LEAVE_DAYS = 240;
// Maximum number of days employer compensates
const MAX_SICK_LEAVE_DAYS = 182;
// Allowed minimum number of sick leave days
const MIN_SICK_LEAVE_DAYS = 4;
// Number of days range employer compensates
const SICK_LEAVE_DAYS_RANGE_EMPLOYER = 8;
// Compensation rate
const COMP_RATE = 0.7;
// number of days in a month for compensation
const DAYS_IN_MONTH = 28;

const CompensationCard = () => {
  const [sickDays, setSickDays] = useState(0);
  const [income, setIncome] = useState(0);
  const [totalCompensation, setTotalCompensation] = useState(0);
  const [employerComp, setEmployerComp] = useState(0);
  const [insuranceComp, setInsuranceComp] = useState(0);
  const [employerCompDays, setEmployerCompDays] = useState(0);
  const [insuranceCompDays, setInsuranceCompDays] = useState(0);
  const [isTB, setIsTB] = useState(false);

  useEffect(() => {
    setTotalCompensation(employerComp + insuranceComp);
  }, [employerComp, insuranceComp]);

  const handleHaveTB = (e: CheckboxChangeEvent) => {
    setIsTB(e.target.checked);
  };

  const handleAverageIncome = (event: any) => {
    if (event.target.value > 0 || event.target.value === '') {
      setIncome(event.target.value);
    } else {
      notification.error({
        message: `Invalid Income. Please input 1 and above`,
      });
    }
  };
  const getSickLeave = (event: any) => {
    if (
      (event.target.value > 0 && event.target.value <= 365) ||
      event.target.value === ''
    ) {
      setSickDays(event.target.value);
    } else {
      notification.error({
        message: `Invalid sick day !!! Please input between ${MIN_SICK_LEAVE_DAYS} - 365`,
      });
    }
  };

  const clearFilters = () => {
    setSickDays(0);
    setEmployerComp(0);
    setEmployerCompDays(0);
    setInsuranceComp(0);
    setInsuranceCompDays(0);
  };

  const handleCalculateComp = () => {
    try {
      if (!(sickDays > 3 && sickDays <= 365)) {
        if (sickDays < MIN_SICK_LEAVE_DAYS) {
          throw new Error(
            `Minimum allowed sick leave is ${MIN_SICK_LEAVE_DAYS}`
          );
        }
        clearFilters();
        return;
      } else {
      }

      // Insurance and employer compensation
      if (
        sickDays > SICK_LEAVE_DAYS_RANGE_EMPLOYER &&
        sickDays <= MAX_SICK_LEAVE_DAYS
      ) {
        const insuranceComp = calculateCompensationRate(
          COMP_RATE,
          income,
          DAYS_IN_MONTH,
          sickDays,
          SICK_LEAVE_DAYS_RANGE_EMPLOYER
        );

        const employerCompRate = calculateEmployerCompensationRate(
          COMP_RATE,
          income,
          DAYS_IN_MONTH
        );
        setInsuranceComp(Math.floor(insuranceComp));
        setEmployerComp(Math.floor(employerCompRate));

        setInsuranceCompDays(sickDays - SICK_LEAVE_DAYS_RANGE_EMPLOYER);
        setEmployerCompDays(MIN_SICK_LEAVE_DAYS);

        return;
      }

      // Employer compensation
      if (
        sickDays >= MIN_SICK_LEAVE_DAYS &&
        sickDays <= SICK_LEAVE_DAYS_RANGE_EMPLOYER
      ) {
        const employerComp = calculateCompensationRate(
          COMP_RATE,
          income,
          DAYS_IN_MONTH,
          sickDays,
          MIN_SICK_LEAVE_DAYS
        );

        setEmployerComp(Math.floor(employerComp));
        setInsuranceComp(0);
        // Subtract days employer doesn't compensate
        setEmployerCompDays(sickDays - 3);
        setInsuranceCompDays(0);
        return;
      }

      // Insurance compensation with TB
      if (
        isTB &&
        sickDays > SICK_LEAVE_DAYS_RANGE_EMPLOYER &&
        sickDays <= MAX_TB_SICK_LEAVE_DAYS
      ) {
        const insuranceComp = calculateCompensationRate(
          COMP_RATE,
          income,
          DAYS_IN_MONTH,
          sickDays,
          SICK_LEAVE_DAYS_RANGE_EMPLOYER
        );

        const employerCompRate = calculateEmployerCompensationRate(
          COMP_RATE,
          income,
          DAYS_IN_MONTH
        );

        setInsuranceComp(Math.floor(insuranceComp));
        setEmployerComp(Math.floor(employerCompRate));

        setInsuranceCompDays(sickDays - SICK_LEAVE_DAYS_RANGE_EMPLOYER);
        setEmployerCompDays(MIN_SICK_LEAVE_DAYS);
        return;
      }

      if (isTB && sickDays > SICK_LEAVE_DAYS_RANGE_EMPLOYER) {
        throw new Error(
          `Maximum allowed sick leave is ${MAX_TB_SICK_LEAVE_DAYS}`
        );
      }

      if (sickDays > SICK_LEAVE_DAYS_RANGE_EMPLOYER) {
        throw new Error(`Maximum allowed sick leave is ${MAX_SICK_LEAVE_DAYS}`);
      }

      setEmployerComp(0);
      setEmployerCompDays(0);
      setInsuranceComp(0);
      setInsuranceCompDays(0);
    } catch (error: any) {
      notification.error({ message: error });
    }
  };
  return (
    <div className="card">
      <div className="flex justify-center">
        <div className="flex flex-col text-black w-11/12 mt-14 gap-1">
          <h1 className="font-bold text-2xl w-40">Compensation Calculator</h1>
          <p>Average income</p>
          <Input
            title="Average income"
            className="font-bold text-2xl h-11 input-gradient -mt-4"
            suffix={'€'}
            onChange={(e) => {
              handleAverageIncome(e);
            }}
            onPressEnter={handleAverageIncome}
            data-testid="handleAverageIncome"
          ></Input>
          <p className="mt-2">Days on sick-leave</p>
          <Input
            title="Days on sick-leave"
            className="font-bold text-2xl h-11 input-gradient -mt-4"
            suffix={'days'}
            onChange={(e) => {
              getSickLeave(e);
            }}
            onPressEnter={getSickLeave}
            data-testid="getSickLeave"
          ></Input>
          <Checkbox data-testid="handleHaveTB" onChange={handleHaveTB}>
            I have tuberculosis
          </Checkbox>
          <div>
            <Button
              style={{
                background: 'linear-gradient(90deg, #911812 0%, #E1261C 100%)',
                height: '60px',
              }}
              className="w-40 mt-2"
              shape="round"
              size="large"
              data-testid="calcButton"
              onClick={handleCalculateComp}
            >
              <p className="text-1xl text-center mt-2 font-bold text-white">
                Calculate
              </p>
            </Button>
            <Divider />
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center mx-10">
        <div className="w-full">
          <div className="text-center">
            <p>The employer compensates</p>
            <p className="font-bold -mt-4" data-testid="employerCompDays">
              {employerCompDays} days
            </p>
            <p className="font-bold text-lg" data-testid="employerComp">
              {employerComp}&euro;
            </p>
          </div>
          <div className="text-gray-400 text-xs text-center -mt-4">
            <p>Daily allowance</p>
            <p>&euro;</p>
          </div>
        </div>
        <div className="w-full">
          <div className="text-center">
            <p>Health Insurance compensates</p>
            <p className="font-bold -mt-4" data-testid="insuranceCompDays">
              {insuranceCompDays} days
            </p>
            <p className="font-bold text-lg" data-testid="insuranceComp">
              {insuranceComp}&euro;
            </p>
          </div>
          <div className="text-center text-gray-400 text-xs -mt-4">
            <p>Daily allowance</p>
            <p>&euro;</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="w-full">
        <div className="text-center">
          <p data-testid="sickDays">
            Compensation total for {sickDays} days (net)
          </p>
          <p data-testid="totalCompensation" className="font-bold text-2xl">
            {totalCompensation}&euro;
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompensationCard;

const calculateCompensationRate = (
  compRate: number,
  income: number,
  daysInMonth: number,
  sickDays: number,
  minSickLeaveDays: number
) => {
  return compRate * (income / daysInMonth) * (sickDays - minSickLeaveDays);
};

const calculateEmployerCompensationRate = (
  compRate: number,
  income: number,
  daysInMonth: number
) => {
  return compRate * (income / daysInMonth) * 4;
};

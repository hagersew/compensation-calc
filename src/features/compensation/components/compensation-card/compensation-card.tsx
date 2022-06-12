import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import './styles/card.css';
import { Button, Divider, notification, Checkbox, Input } from 'antd';

const CompensationCard = () => {
  const [sickDays, setSickDays] = useState(0);
  const [income, setIncome] = useState(0);
  const [totalCompensation, setTotalCompensation] = useState(0);
  const [employerComp, setEmployerComp] = useState(0);
  const [insuranceComp, setInsuranceComp] = useState(0);
  const [employerCompDays, setEmployerCompDays] = useState(0);
  const [insuranceCompDays, setIsuranceCompDays] = useState(0);
  const [isTB, setIsTB] = useState(false);

  // Maximum number of days insurance compensates
  const maxTBSickLeaveDays = 240;
  // Maximum number of days employer compensates
  const maxSickLeaveDays = 182;
  // Allowed minimum number of sick leave days
  const minSickLeaveDays = 4;
  // Number of days range employer compensates
  const sickLeaveDaysRangeEmployer = 8;
  // Compensation rate
  const compRate = 0.7;
  // number of days in a month for compensation
  const daysInMonth = 28;

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
        message: `Invalid sick day !!! Please input between ${minSickLeaveDays} - 365`,
      });
    }
  };

  const handleCalculateComp = () => {
    if (sickDays > 3 && sickDays <= 365) {
      if (
        sickDays > sickLeaveDaysRangeEmployer &&
        sickDays <= maxSickLeaveDays
      ) {
        // insurance and employer compensation
        const insuranceComp =
          compRate *
          (income / daysInMonth) *
          (sickDays - sickLeaveDaysRangeEmployer);
        const employerComp = compRate * (income / daysInMonth) * 4;
        setInsuranceComp(Math.floor(insuranceComp));
        setEmployerComp(Math.floor(employerComp));

        setIsuranceCompDays(sickDays - sickLeaveDaysRangeEmployer);
        setEmployerCompDays(minSickLeaveDays);
      } else if (
        sickDays >= minSickLeaveDays &&
        sickDays <= sickLeaveDaysRangeEmployer
      ) {
        // Employer compensation
        const comp =
          compRate * (income / daysInMonth) * (sickDays - minSickLeaveDays);

        setEmployerComp(Math.floor(comp));
        setInsuranceComp(0);
        // Subtract days employer doesn't compensate
        setEmployerCompDays(sickDays - 3);
        setIsuranceCompDays(0);
      } else if (
        isTB &&
        sickDays > sickLeaveDaysRangeEmployer &&
        sickDays <= maxTBSickLeaveDays
      ) {
        // Insurance compensation with TB
        const insuranceComp =
          compRate *
          (income / daysInMonth) *
          (sickDays - sickLeaveDaysRangeEmployer);
        const employerComp = compRate * (income / daysInMonth) * 4;
        setInsuranceComp(Math.floor(insuranceComp));
        setEmployerComp(Math.floor(employerComp));

        setIsuranceCompDays(sickDays - sickLeaveDaysRangeEmployer);
        setEmployerCompDays(minSickLeaveDays);
      } else {
        if (isTB && sickDays > sickLeaveDaysRangeEmployer) {
          notification.error({
            message: `Maximum allowed sick leave is ${maxTBSickLeaveDays}`,
          });
        } else if (sickDays > sickLeaveDaysRangeEmployer) {
          notification.error({
            message: `Maximum allowed sick leave is ${maxSickLeaveDays}`,
          });
        }
        setEmployerComp(0);
        setEmployerCompDays(0);
        setInsuranceComp(0);
        setIsuranceCompDays(0);
      }
    } else {
      if (sickDays < minSickLeaveDays) {
        notification.error({
          message: `Minimum allowed sick leave is ${minSickLeaveDays}`,
        });
      }
      setSickDays(0);
      setEmployerComp(0);
      setEmployerCompDays(0);
      setInsuranceComp(0);
      setIsuranceCompDays(0);
    }
  };
  return (
    <div className="bg-white rounded-3xl card">
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
          ></Input>
          <Checkbox onChange={handleHaveTB}>I have tubercolosis</Checkbox>
          <div>
            <Button
              style={{
                background: 'linear-gradient(90deg, #911812 0%, #E1261C 100%)',
                height: '60px',
              }}
              className="w-40 mt-2"
              shape="round"
              size="large"
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
            <p className="font-bold -mt-4">{employerCompDays} days</p>
            <p className="font-bold text-lg">{employerComp}&euro;</p>
          </div>
          <div className="text-gray-400 text-xs text-center -mt-4">
            <p>Daily allowance</p>
            <p>&euro;</p>
          </div>
        </div>
        <div className="w-full">
          <div className="text-center">
            <p>Health Insurance compensates</p>
            <p className="font-bold -mt-4">{insuranceCompDays} days</p>
            <p className="font-bold text-lg">{insuranceComp}&euro;</p>
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
          <p>Compensation total for {sickDays} days (net)</p>
          <p className="font-bold text-2xl">{totalCompensation}&euro;</p>
        </div>
      </div>
    </div>
  );
};

export default CompensationCard;

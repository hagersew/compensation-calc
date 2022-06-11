import Checkbox from 'antd/lib/checkbox/Checkbox';
import Input from 'antd/lib/input/Input';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import './styles/card.css';
import { Button, Divider, notification } from 'antd';

const CompensationCard = () => {
  const [sickDays, setSickDays] = useState(0);
  const [income, setIncome] = useState(0);
  const [totalCompensation, setTotalCompensation] = useState(0);
  const [employerComp, setEmployerComp] = useState(0);
  const [insuranceComp, setInsuranceComp] = useState(0);
  const [employerCompDays, setEmployerCompDays] = useState(0);
  const [insuranceCompDays, setIsuranceCompDays] = useState(0);
  const [isTB, setIsTB] = useState(false);

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
          ></Input>
          <p className="mt-2">Days on sick-leave</p>
          <Input
            title="Days on sick-leave"
            className="font-bold text-2xl h-11 input-gradient -mt-4"
            suffix={'days'}
          ></Input>
          <Checkbox>I have tubercolosis</Checkbox>
          <div>
            <Button
              style={{
                background: 'linear-gradient(90deg, #911812 0%, #E1261C 100%)',
                height: '60px',
              }}
              className="w-40 mt-2"
              shape="round"
              size="large"
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

import React, { Component } from 'react';
import ListItem from './components/list-item/list-item';
import { CompensationCard } from './components/index';
import './../../styles/style.scss';
import image from '../../assets/Image.png';

const Compensation = () => {
  return (
    <div className="flex justify-center redberry h-fit">
      <div className="flex flex-row w-10/12 my-12">
        <div className="lg:flex gap-40">
          <div className="text-white">
            <p className="text-3xl font-bold">Quam Tristique Condimentum</p>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cum sociis natoque penatibus et
              magnis dis parturient montes, nascetur ridiculus mus.{' '}
              <a
                href="https://"
                style={{
                  color: '#E1261C',
                }}
                className="underline"
              >
                Curabitur blandit
              </a>{' '}
              tempus porttitor. Integer posuere erat a ante venenatis dapibus
              posuere velit aliquet. Vestibulum id ligula porta felis euismod
              semper.
            </p>
            <div className="flex flew-row my-12 ">
              <div>
                <p className="text-3xl font-bold">
                  Fringilla Euismod Adipiscing Ipsum
                </p>
                <p>
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Maecenas faucibus mollis interdum.
                  Aenean lacinia bibendum nulla sed.
                </p>
                <ul className="flex flex-col gap-1 ">
                  <ListItem color="linear-gradient(90deg, #911812 0%, #E1261C 100%)">
                    Tellus Ullamcorper Inceptos
                  </ListItem>
                  <ListItem color="linear-gradient(90deg, #911812 0%, #E1261C 100%)">
                    Magna Condimentum
                  </ListItem>
                  <ul className="ml-6">
                    <li>
                      <ListItem color="linear-gradient(90deg, #D3DAE8 0%, #A7B7D8 100%)">
                        Mattis Tristique
                      </ListItem>
                    </li>
                    <li>
                      <ListItem color="linear-gradient(90deg, #D3DAE8 0%, #A7B7D8 100%)">
                        Pharetra Pellentesque Dapibus
                      </ListItem>
                    </li>
                  </ul>
                  <ListItem color="linear-gradient(90deg, #911812 0%, #E1261C 100%)">
                    Aenean Inceptos
                  </ListItem>
                  <ListItem color="linear-gradient(90deg, #911812 0%, #E1261C 100%)">
                    Parturient Bibendum
                  </ListItem>
                </ul>
              </div>
              <div className="ml-2">
                <img src={image} alt="img" />
              </div>
            </div>
          </div>
          <div>
            <CompensationCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Compensation;

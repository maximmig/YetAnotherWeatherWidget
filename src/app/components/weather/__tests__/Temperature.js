import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Temperature from '../Temperature';

import {UNITS} from '../../../constants';

import styles from '../Temperature.css';

Enzyme.configure({adapter: new Adapter()});

describe('Temperature component', () => {
  const selectedUnits = UNITS.metric.name;
  const temp = 20;

  it('should render temperature', () => {
    const wrapper = shallow(
      <Temperature
        selectedUnits={selectedUnits}
        temp={temp}
      />);
    expect(wrapper.find(`.${styles.temp}`).text()).toEqual(`${temp}${UNITS[selectedUnits].temp}`);
  });

  it('should render rounded temperature', () => {
    const tempFloat = 20.3;
    const wrapper = shallow(
      <Temperature
        selectedUnits={selectedUnits}
        temp={tempFloat}
      />);
    expect(wrapper.find(`.${styles.temp}`).text()).toEqual(`${Math.round(temp)}${UNITS[selectedUnits].temp}`);
  });

  it('should render temperature in imperial units', () => {
    const imperialUnits = UNITS.imperial.name;
    const wrapper = shallow(
      <Temperature
        selectedUnits={imperialUnits}
        temp={temp}
      />);
    expect(wrapper.find(`.${styles.temp}`).text()).toEqual(`${temp}${UNITS[imperialUnits].temp}`);
  });

  it('should render custom css class', () => {
    const customClassName = 'foobar';
    const wrapper = shallow(
      <Temperature
        selectedUnits={selectedUnits}
        temp={temp}
        className={customClassName}
      />);
    expect(wrapper.find(`.${styles.temp}.${customClassName}`).length).toEqual(1);
  });
});

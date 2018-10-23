import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import TemperatureRange from '../TemperatureRange';
import Temperature from '../Temperature';

import styles from '../TemperatureRange.css';

Enzyme.configure({adapter: new Adapter()});

describe('TemperatureRange component', () => {
  const selectedUnits = 'metric';
  const minTemp = 10;
  const temp = 20;
  const maxTemp = 30;

  it('should render a Temperature component for each temperature', () => {
    const wrapper = shallow(
      <TemperatureRange
        selectedUnits={selectedUnits}
        temp={temp}
        minTemp={minTemp}
        maxTemp={maxTemp}
      />
    );
    expect(wrapper.find(Temperature).length).toEqual(3);
    expect(wrapper.find(`.${styles.minTemp}`).length).toEqual(1);
    expect(wrapper.find(`.${styles.maxTemp}`).length).toEqual(1);
  });

  it('should not render Temperature components for min and max temperatures if they are equal', () => {
    const wrapper = shallow(
      <TemperatureRange
        selectedUnits={selectedUnits}
        temp={temp}
        minTemp={temp}
        maxTemp={temp}
      />
    );
    expect(wrapper.find(Temperature).length).toEqual(1);
    expect(wrapper.find(`.${styles.minTemp}`).length).toEqual(0);
    expect(wrapper.find(`.${styles.maxTemp}`).length).toEqual(0);
  });

  it('should not render Temperature components for min and max temperatures if omitted', () => {
    const wrapper = shallow(
      <TemperatureRange
        selectedUnits={selectedUnits}
        temp={temp}
      />
    );
    expect(wrapper.find(Temperature).length).toEqual(1);
    expect(wrapper.find(`.${styles.minTemp}`).length).toEqual(0);
    expect(wrapper.find(`.${styles.maxTemp}`).length).toEqual(0);
  });

  it('should match the last snapshot with average temperature only', () => {
    const wrapper = shallow(
      <TemperatureRange
        selectedUnits={selectedUnits}
        temp={temp}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match the last snapshot with min, max and average temperatures', () => {
    const wrapper = shallow(
      <TemperatureRange
        selectedUnits={selectedUnits}
        temp={temp}
        minTemp={minTemp}
        maxTemp={maxTemp}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

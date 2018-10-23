import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TemperatureRange from '../TemperatureRange';
import styles from '../TemperatureRange.css';
import Temperature from '../Temperature';

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
      />);
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
      />);
    expect(wrapper.find(Temperature).length).toEqual(1);
    expect(wrapper.find(`.${styles.minTemp}`).length).toEqual(0);
    expect(wrapper.find(`.${styles.maxTemp}`).length).toEqual(0);
  });

  it('should not render Temperature components for min and max temperatures if omitted', () => {
    const wrapper = shallow(
      <TemperatureRange
        selectedUnits={selectedUnits}
        temp={temp}
      />);
    expect(wrapper.find(Temperature).length).toEqual(1);
    expect(wrapper.find(`.${styles.minTemp}`).length).toEqual(0);
    expect(wrapper.find(`.${styles.maxTemp}`).length).toEqual(0);
  });
});

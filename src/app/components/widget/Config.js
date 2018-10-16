import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from '@jetbrains/ring-ui/components/select/select';
import Panel from '@jetbrains/ring-ui/components/panel/panel';
import Button from '@jetbrains/ring-ui/components/button/button';
import ErrorBubble from '@jetbrains/ring-ui/components/error-bubble/error-bubble';

import {UNITS} from '../../constants';
import {Option} from '../../helpers';

import styles from './Config.css';

const DEFAULT_UNITS = UNITS.metric;

const LOCATION_OPTIONS = [
  Option('Boston, MA', '4930956', 'https://flagpedia.net/data/flags/mini/us.png'),
  Option('Foster City, CA', '5350159', 'https://flagpedia.net/data/flags/mini/us.png'),
  Option('Marlton, NJ', '4502911', 'https://flagpedia.net/data/flags/mini/us.png'),
  Option('New York, NY', '5128581', 'https://flagpedia.net/data/flags/mini/us.png'),
  Option('Munich', '2867714', 'https://flagpedia.net/data/flags/mini/de.png'),
  Option('Prague', '3067696', 'https://flagpedia.net/data/flags/mini/cz.png'),
  Option('Moscow', '524901', 'https://flagpedia.net/data/flags/mini/ru.png'),
  Option('Novosibirsk', '1496747', 'https://flagpedia.net/data/flags/mini/ru.png'),
  Option('Saint Petersburg', '498817', 'https://flagpedia.net/data/flags/mini/ru.png'),
];

const UNIT_OPTIONS = [
  Option(UNITS.metric.name),
  Option(UNITS.imperial.name),
];

export default class Config extends Component {
  static propTypes = {
    selectedLocation: PropTypes.string,
    selectedUnits: PropTypes.oneOf(Object.keys(UNITS)),
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    selectedLocation: null,
    selectedUnits: null,
    onSave: Function.prototype,
    onCancel: Function.prototype,
  };

  constructor(props) {
    super(props);

    const {selectedLocation, selectedUnits} = props;

    this.state = {
      selectedLocation,
      selectedUnits,
    };
  }

  handleLocationChange = selectedLocation => {
    this.setState({selectedLocation: selectedLocation.key});
  };

  handleUnitChange = selectedUnits => {
    this.setState({selectedUnits: selectedUnits.key});
  };

  handleSaveClick = () => {
    const {selectedLocation} = this.state;
    if (selectedLocation != null) {
      const selectedUnits = this.state.selectedUnits || DEFAULT_UNITS.name;
      this.props.onSave(selectedLocation, selectedUnits);
    }
  };

  handleCancelClick = () => {
    this.props.onCancel();
  };

  render() {
    const {
      selectedLocation,
      selectedUnits,
    } = this.state;

    const selectedLocationOption = LOCATION_OPTIONS.find(o => o.key === selectedLocation);
    const selectedUnitsOption = UNIT_OPTIONS.find(o => o.key === selectedUnits);

    return (
      <div className={styles.config}>
        <ErrorBubble error={selectedLocation == null ? 'Location is required' : null}>
          <Select
            data={LOCATION_OPTIONS}
            selected={selectedLocationOption}
            onChange={this.handleLocationChange}
            label="Select location"
          />
        </ErrorBubble><br/>
        <Select
          data={UNIT_OPTIONS}
          selected={selectedUnitsOption}
          onChange={this.handleUnitChange}
          label={`Select units (default: ${DEFAULT_UNITS.name})`}
        />
        <Panel>
          <Button
            primary
            onClick={this.handleSaveClick}
          >
            {'Save'}
          </Button>
          <Button onClick={this.handleCancelClick}>{'Cancel'}</Button>
        </Panel>
      </div>
    );
  }
}

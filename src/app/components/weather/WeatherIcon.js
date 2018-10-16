import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@jetbrains/ring-ui/components/tooltip/tooltip';

import classnames from 'classnames';

import styles from './WeatherIcon.css';

const WeatherIcon = ({id, alt, title, className}) => {
  const icon = (
    <img
      className={classnames(styles.weatherIcon, className)}
      alt={alt}
      src={`https://openweathermap.org/img/w/${id}.png`}
    />
  );
  return (
    <React.Fragment>
      {title ? (
        <Tooltip title={title}>{icon}</Tooltip>
      ) : (
        icon
      )}
    </React.Fragment>
  );
};

WeatherIcon.propTypes = {
  id: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default WeatherIcon;

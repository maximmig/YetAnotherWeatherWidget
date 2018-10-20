import React from 'react';
import PropTypes from 'prop-types';
import {H1} from '@jetbrains/ring-ui/components/heading/heading';

import classnames from 'classnames';

import styles from './Header.css';

const Header = ({city, className}) => (
  <div className={classnames(styles.header, className)}>
    <H1 className={styles.headerText} caps>{city}</H1>
  </div>
);

Header.propTypes = {
  city: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Header;

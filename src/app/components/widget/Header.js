import React from 'react';
import PropTypes from 'prop-types';
import {H1} from '@jetbrains/ring-ui/components/heading/heading';

import styles from './Header.css';

const Header = ({city}) => (
  <div className={styles.header}>
    <H1 className={styles.headerText} caps>{city}</H1>
  </div>
);

Header.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Header;

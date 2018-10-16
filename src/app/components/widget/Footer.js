import React from 'react';
import PropTypes from 'prop-types';
import Button from '@jetbrains/ring-ui/components/button/button';
import {UpdateIcon, ExceptionIcon} from '@jetbrains/ring-ui/components/icon';
import Tooltip from '@jetbrains/ring-ui/components/tooltip/tooltip';
import classnames from 'classnames';

import {formatTime} from '../../helpers';
import {UNITS} from '../../constants';

import styles from './Footer.css';

const Footer = ({isLoading, lastUpdateTime, selectedUnits, onRefresh, error}) => {
  const units = UNITS[selectedUnits];
  const updateTime = formatTime(lastUpdateTime, units.timeFormat);

  return (
    <div className={styles.footer}>
      {`Last updated at ${updateTime}`}
      <Button
        className={styles.refreshButton}
        disabled={isLoading}
        onClick={onRefresh}
      >
        <UpdateIcon
          size={UpdateIcon.Size.Size14}
          className={classnames(styles.refreshButtonIcon, styles.footerIcon, {
            [styles.refreshButtonIconLoading]: isLoading,
          })}
        />
      </Button>
      {error && (
        <Tooltip title={error}>
          <ExceptionIcon
            size={ExceptionIcon.Size.Size14}
            className={classnames(styles.footerIcon)}
          />
        </Tooltip>
      )}
    </div>
  );
};

Footer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  lastUpdateTime: PropTypes.number.isRequired,
  selectedUnits: PropTypes.oneOf(Object.keys(UNITS)).isRequired,
  onRefresh: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Footer;

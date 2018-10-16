import React from 'react';
import PropTypes from 'prop-types';
import EmptyWidget, {EmptyWidgetFaces} from '@jetbrains/hub-widget-ui/dist/empty-widget';

import styles from './Status.css';

const Status = ({face, message}) => (
  <div className={styles.status}>
    <EmptyWidget
      face={face}
      message={message}
    />
  </div>
);

Status.propTypes = {
  face: PropTypes.oneOf(Object.values(EmptyWidgetFaces)).isRequired,
  message: PropTypes.string.isRequired,
};

export default Status;

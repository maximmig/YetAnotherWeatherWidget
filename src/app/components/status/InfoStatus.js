import React from 'react';
import PropTypes from 'prop-types';
import {EmptyWidgetFaces} from '@jetbrains/hub-widget-ui/dist/empty-widget';

import Status from './Status';

const InfoStatus = ({message}) => (
  <Status
    face={EmptyWidgetFaces.JOY}
    message={message}
  />
);

InfoStatus.propTypes = {
  message: PropTypes.string.isRequired,
};

export default InfoStatus;

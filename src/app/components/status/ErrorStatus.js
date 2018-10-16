import React from 'react';
import PropTypes from 'prop-types';
import {EmptyWidgetFaces} from '@jetbrains/hub-widget-ui/dist/empty-widget';

import Status from './Status';

const ErrorStatus = ({message}) => (
  <Status
    face={EmptyWidgetFaces.ERROR}
    message={message}
  />
);

ErrorStatus.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorStatus;

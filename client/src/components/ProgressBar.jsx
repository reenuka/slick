import React from 'react';
import { Progress } from 'reactstrap';

const ProgressBar = ({ progress, progressValue }) => {
  return (
    <div className="text-center">
      {progress !== null ? <Progress animated color="success" value={progressValue} ></Progress> : progress = null}
    </div>
  );
};

export default ProgressBar;
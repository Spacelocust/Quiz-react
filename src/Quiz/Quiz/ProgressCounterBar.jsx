import React from "react";
import { ProgressBar } from "react-bootstrap";

const ProgressCounterBar = ({ counter, time}) => {
    return <ProgressBar variant={((counter * 100) / time) >= 50 ? 'success' : ((counter * 100) / time) < 50 && ((counter * 100) / time) >= 25 ? 'warning' : 'danger' } now={((counter * 100) / time)} />
}

export default ProgressCounterBar;
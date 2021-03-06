import React, { Fragment } from 'react';
import classes from './ErrorModal.module.css';
import Backdrop from './Backdrop';

const ErrorModal = props => {
  console.log(props.error)
  return (
    <Fragment>
      <Backdrop onClick={props.onClear} />
      <div className={classes.errorModal}>
        <header>
          <h3> An Error Occured!</h3>
        </header>
        <div>{props.error}</div>
        <span className={classes.myButton}>
          <button className={classes.delete} onClick={props.onClear}>Okay</button>
        </span>
      </div>
    </Fragment>
  );
};

export default ErrorModal;

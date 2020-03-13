import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {
  let inputElement = null;

  inputElement = (
    <input
      className={styles.InputElement}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed}
    />
  );

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      { inputElement }
    </div>
  );
};

export default Input;

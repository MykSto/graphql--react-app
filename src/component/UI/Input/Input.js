import React from 'react';
import styles from './Input.module.css';

const Input = (props) => (
  <div className={styles.Input}>
    {props.type === 'select' ? (
      <select onChange={props.changed}>
        <option />
        <option>CLOSED</option>
        <option>OPEN</option>
      </select>
    )

      : (
        <div>
          <label className={styles.Label}>{props.label}</label>
          <input type={props.type} onChange={props.changed} className={styles.InputElement} />
        </div>
      )}

  </div>
);

export default Input;

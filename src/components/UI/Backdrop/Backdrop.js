import React from 'react';
import styles from './Backdrop.module.css';

const backdrop = (props) => (
  props.showComments ? <div className={styles.Backdrop} onClick={props.clicked} /> : null
);

export default backdrop;

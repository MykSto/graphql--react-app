import React from 'react';
import requestSvg from 'assets/pull-request-icon.svg';
import styles from './PullRequestCard.module.css';

const PullRequestCard = (props) => (
  <div className={styles.Card}>
    <img src={requestSvg} alt="requestSvg" />
    <p className={styles.Title}>{props.title}</p>
    <div className={styles.Bar}>
      <div className={styles.Emptybar} />
      <div className={styles.Filledbar} />
    </div>
  </div>
);

export default PullRequestCard;

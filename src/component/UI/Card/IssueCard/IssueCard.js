import React from 'react';
import issueSvg from 'assets/issue-icon.svg';
import commentSvg from 'assets/comment-icon.svg';
import styles from './IssueCard.module.css';

const IssueCard = (props) => (
  <div className={styles.Card}>
    <img src={issueSvg} alt="issueSvg" />
    <p className={styles.Title}>{props.title}</p>
    <div className={styles.Bar}>
      <div className={styles.Emptybar} />
      <div className={styles.Filledbar} />
    </div>
    <div className={styles.Comments}>
      {props.comments.map((el) => (
        <ul key={el.id}>
          <li>
            <img src={commentSvg} alt="commentSvg" />
            {el}
          </li>
        </ul>
      ))}
    </div>
  </div>
);

export default IssueCard;

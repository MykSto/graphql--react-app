import React, { useState } from 'react';
import issueSvg from 'assets/issue-icon.svg';
import commentSvg from 'assets/comment-icon.svg';
import Modal from 'components/UI/Modal/Modal';
import styles from './IssueCard.module.css';

const IssueCard = (props) => {
  const [comments, setComments] = useState({
    showComments: false,
  });

  const commentsArray = [].concat(props.comments)
    .map((el) => el);

  const showCommentsHandler = () => {
    const commentsState = comments.showComments;

    setComments((comments) => ({
      ...comments,
      showComments: !commentsState,
    }));
  };

  return (
    <div className={styles.Card}>
      <img src={issueSvg} alt="issueSvg" />
      <p className={styles.Title} onClick={showCommentsHandler}>{props.title}</p>
      <div className={styles.Bar}>
        <div className={styles.Emptybar} />
        <div className={styles.Filledbar} />
      </div>
      <div className={styles.Comments}>
        <Modal showComments={comments.showComments}>
          {comments.showComments
            && commentsArray.sort().map((el) => (
              <ul key={el.id}>
                <li>
                  <img src={commentSvg} alt="commentSvg" />
                  {el}
                </li>
              </ul>
            ))}
        </Modal>
      </div>
    </div>
  );
};

export default IssueCard;

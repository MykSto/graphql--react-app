/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Aux from 'hoc/Auxiliary';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import styles from './Modal.module.css';

class Modal extends Component {
  render() {
    return (
      <Aux>
        <Backdrop clicked={this.props.showComments} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.showComments ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.showComments ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;

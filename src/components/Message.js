import React, { Component, PropTypes } from 'react'

import styles from './Message.scss'

export default class Message extends Component {
  render() {
    const { message: { user: { nickname }, timestamp, body }, theSame } = this.props

    const header = !theSame ? (
      <div className={styles.header}>
        <span className={styles.nickname}>{nickname}</span>
        <span className={styles.ts}>{new Date(timestamp).toTimeString()}</span>
      </div>
    ) : ''

    return (
      <div className={`${styles.root}${theSame ? ` ${styles.same}` : ''}`}>
        {header}
        <div className={styles.body}>
          {body}
        </div>
      </div>
    );
  }
}
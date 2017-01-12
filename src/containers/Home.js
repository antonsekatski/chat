import React, { Component, PropTypes } from 'react';
import { connect } from 'beeblebrox'

import Sidebar from '../components/Sidebar'
import Messages from '../components/Messages'
import Form from '../components/Form'

import styles from './Home.scss'

class Home extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.container}>
          <div className={styles.messages}>
            <div className={styles.form}>
              <Form />
            </div>
            <div className={styles.scroll}>
              <Messages />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(Home)

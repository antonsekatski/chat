import React, { Component, PropTypes } from 'react';
import { connect } from 'beeblebrox'

import Sidebar from '../components/Sidebar'
import Messages from '../components/Messages'
import Form from '../components/Form'

import styles from './Home.scss'

class Home extends Component {
  componentWillMount() {
    this.props.actions.rooms.set('main')
  }

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
            <Messages />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(Home)

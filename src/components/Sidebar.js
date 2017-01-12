import React, { Component, PropTypes } from 'react'
import { connect } from 'beeblebrox'

import UserForm from './UserForm'

import styles from './Sidebar.scss'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.openForm = this.openForm.bind(this)
  }

  openForm() {
    this.props.actions.modals.open(UserForm)
  }

  render() {
    const currentUser = this.props.store('current_user')

    const users = this.props.store('rooms#main') || {}

    const usersList = Object.keys(users).map(key => {
      const user = users[key]
      return <div className={styles.rosterElem}>{user.nickname}</div>
    })

    return (
      <div className={styles.root}>
        <div className={styles.group}>
          <div className={styles.user}>{currentUser.nickname}</div>
          <button onClick={this.openForm}>change username</button>
        </div>
        <div className={styles.group}>
          <div className={styles.label}>Room</div>
          {usersList}
        </div>
      </div>
    );
  }
}

export default connect(Sidebar)
import React, { Component, PropTypes } from 'react'
import { connect } from 'beeblebrox'

import styles from './UserForm.scss'

class UserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }

    this.update= this.update.bind(this)
  }

  update(ev) {
    ev.preventDefault()
    this.props.actions.users.updateCurrent({ nickname: this.state.value })
    this.props.actions.users.updateRoster({ nickname: this.state.value })
    this.props.actions.modals.close()
  }

  render() {
    return (
      <form onSubmit={this.update} className={styles.root}>
        <button className={styles.close} onClick={(ev) => {ev.preventDefault(); this.props.actions.modals.close()}}>×</button>
        <div className={styles.hSub}>Update username</div>
        <div className={styles.group}>
          <div className={styles.label}>Username</div>
          <input type="text" className={styles.text} value={this.state.value} onChange={(ev) => this.setState({ value: ev.target.value })} />
        </div>
        <button type="submit" onClick={this.update} className={styles.button}>Update</button>
      </form>
    );
  }
}

export default connect(UserForm)
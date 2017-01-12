import React, { Component, PropTypes } from 'react'
import { connect } from 'beeblebrox'

import styles from './Form.scss'

class UserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }

    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage(ev) {
    ev.preventDefault()
    this.props.actions.users.update({ nickname: this.state.value })
    this.props.actions.modals.close()
  }

  render() {
    return (
      <form onSubmit={this.sendMessage} className={styles.root}>
        <input type="text" className={styles.text} value={this.state.value} onChange={(ev) => this.setState({ value: ev.target.value })} />
        <button onClick={this.sendMessage} className={styles.button}>Send</button>
      </form>
    );
  }
}

export default connect(UserForm)
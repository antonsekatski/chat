import React, { Component, PropTypes } from 'react'
import { connect } from 'beeblebrox'

import Message from './Message'

class Messages extends Component {
  render() {
    const currentRoom = this.props.store('current-room')

    let previousId = null
    const messagesList = (this.props.store(`${currentRoom}#messages`) || []).map(msg => {
      const theSame = previousId === msg.user.id
      previousId = msg.user.id
      return <Message message={msg} theSame={theSame} />
    })

    return (
      <div>
        {messagesList}
      </div>
    );
  }
}

export default connect(Messages)
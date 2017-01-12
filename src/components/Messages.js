import React, { Component, PropTypes } from 'react'
import { connect } from 'beeblebrox'

import Message from './Message'

class Messages extends Component {
  render() {
    let previousId = null
    const messagesList = (this.props.store(`history`) || []).map(msg => {
      const theSame = previousId === msg.user.id
      previousId = msg.user.id
      return <Message key={msg.id} message={msg} theSame={theSame} />
    })

    return (
      <div>
        {messagesList}
      </div>
    );
  }
}

export default connect(Messages)
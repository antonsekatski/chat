import React, { Component, PropTypes } from 'react';
import { connect } from 'beeblebrox'

import styles from './Modals.scss'

class Modals extends Component {
  render() {
    const current = this.props.store('modal')

    if (!current) {
      if (typeof document !== 'undefined') {
        document.documentElement.style.overflow = ''
        const element = document.getElementById('app')
        element.style['-webkit-filter'] = ''
        element.style.filter = ''
      }

      return (<div></div>);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = 'hidden'
      const element = document.getElementById('page')
      element.style['-webkit-filter'] = 'blur(3px)'
      element.style.filter = 'blur(3px)'
    }

    return (
      <div>
        <div className={ styles.overlay } onClick={this.props.actions.modal.close}></div>
        <div className={ styles.wrapper }>{React.createElement(current.component, current.props)}</div>
      </div>
    );
  }
}

export default connect(Modals)
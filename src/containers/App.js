import React, { Component, PropTypes } from 'react'
import { connect } from 'beeblebrox'

import Modals from '../components/Modals'

require('./App.scss')

const coolUsernames = [
  'legolas',
  'kirk',
  'boromir',
  'beeblebrox',
  'gandalf',
  'elonmusk', // Why not?
];

class App extends Component {

  static propTypes = {
    children: PropTypes.object,
  };

  componentWillMount() {
    this.props.actions.users.update({ 
      id: Math.random().toString(36).slice(2, 10),
      nickname: `${coolUsernames[Math.floor(Math.random()*coolUsernames.length)]}-${Math.random().toString(36).slice(2, 10)}` })
    this.props.actions.socket.create()
  }

  render() {
    return (
      <div>
        <Modals />
        {this.props.children}
      </div>
    );
  }
}

export default connect(App)

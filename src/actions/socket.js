import io from 'socket.io-client'

export function create() {
  if (!this.get('socket', null)) {
    const socket = io();
    this.set('socket', socket)

    socket.emit('presence', this.get('current_user'))

    socket.on('message', msg => {
      // Cheap support for rooms... yeah, Beeblebrox is awesome
      this.list.push('history', msg)
    })

    socket.on('state', state => {
      this.set('history', state.history)
      this.set('room', state.roster)
    })

    socket.on('presence', ({ id, user }) => {
      const users = this.get('room', {})
      users[id] = user
      this.set('room', users)
    })

    socket.on('disconnect', ({ id, user }) => {
      const users = this.get('room', {})
      delete users[id]
      this.set('room', users)
    })

    socket.on('update_user', ({ id, user }) => {
      // Suck it up and cope, buddy... just brutally copy that from other function line by line. No respect for the DRY concept, jeez
      const users = this.get('room', {})

      users[id] = user

      this.set('room', users)
    })
  }
}
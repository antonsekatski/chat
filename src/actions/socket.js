import io from 'socket.io-client'

export function create() {
  if (!this.get('socket', null)) {
    const socket = io();
    this.set('socket', socket)

    socket.emit('presence', this.get('current_user'))

    socket.on('message', msg => {
      // Cheap support for rooms... yeah, Beeblebrox is awesome
      this.list.push('main#messages', msg)
    })

    socket.on('state', state => {
      this.set('main#messages', state.history)
      this.set('rooms#main', state.roster)
    })

    socket.on('presence', user => {
      const users = this.get('rooms#main', {})
      users[user.id] = user
      this.set('rooms#main', users)
    })

    socket.on('disconnect', user => {
      const users = this.get('rooms#main', {})
      delete users[user.id]
      this.set('rooms#main', users)
    })
  }
}
export function send(body) {
  const socket = this.get('socket')
  const user = this.get('current_user')

  const message = { id: Math.random().toString(36).slice(2, 10), user, body, timestamp: new Date() }

  socket.emit('message', message)

  const currentRoom = this.get('current_room', 'history') // no current_room available at the moment, just for the sake of the test

  this.list.push(currentRoom, message)
}
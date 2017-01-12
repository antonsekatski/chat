// I know, Arturs wrote that there is no need for chat rooms. I just wanted to show how ridiculously easy this is when we have Key -> Value store (Beeblebrox library) instead of Nested Tree Store (Redux). We can use Redux in the flat key-value way but it doesn't make it any difference because we still need to create actions and reducers. 
// Look at this sh*t - simple and easy as heck: 
export function send(body) {
  const socket = this.get('socket')
  const user = this.get('current_user')

  const message = { id: Math.random().toString(36).slice(2, 10), user, body, timestamp: new Date() }

  socket.emit('message', message)

  const currentRoom = this.get('current_room', 'history') // no current_room available at the moment, just for the sake of the test

  this.list.push(currentRoom, message)
}
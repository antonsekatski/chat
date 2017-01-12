export function updateCurrent(fields) {
  const current = Object.assign({}, this.get('current_user', {}), fields)

  this.set('current_user', current)
}

export function updateRoster() {
  const users = this.get('room', {})

  const currentUser = this.get('current_user')

  // Update roster
  users[this.get('socket').id] = currentUser

  this.set('room', users)

  this.get('socket').emit('update_user', currentUser) 
}
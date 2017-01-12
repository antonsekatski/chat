export function open(current) {
  this.set('modal', current)
}

export function close() {
  this.del('modal')
}
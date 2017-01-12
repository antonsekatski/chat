export function open(component, props = {}) {
  this.set('modal', { component, props })
}

export function close() {
  this.del('modal')
}
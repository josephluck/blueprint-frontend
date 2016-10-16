import io from 'socket.io-client'

export default {
  init () {
    const socket = io('http://localhost:3030/', {
      query: 'hey=abc'
    })
    this.socket = socket
  },
  on () {
    this.socket.on(...arguments)
  }
}

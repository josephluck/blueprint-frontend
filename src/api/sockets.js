import io from 'socket.io-client'

export default {
  init () {
    const socket = io('http://localhost:3030/admin/', {
      transport: ['websockets']
    })
    this.socket = socket
  },
  on () {
    this.socket.on(...arguments)
  }
}

// 多个发布者、订阅者
function EasyStore() {
  // this.publishers = {} // 发布者们
  this.message = {} // 发布者的消息
  this.listeners = {} // 订阅者们
}

EasyStore.prototype = {
  on(publisher, listener, cb) {
    if (!this.listeners[publisher]) {
      this.listeners[publisher] = []
    }
    const listenerItem = {
      listener: listener,
      notify: cb
    }
    this.listeners[publisher].push(listenerItem)
  },
  off(publisher, listener) { // 取消订阅某个人
    if (!this.listeners[publisher]) {
      return
    }
    const index = this.listeners[publisher].findIndex(item => item.listener === listener)
    if (index !== -1) {
      this.listeners[publisher].splice(index, 1)
    }
  },
  emit(publisher, context) {
    const listeners = this.listeners[publisher] || []
    listeners.forEach(listener => {
      listener.notify(context)
    })
  }
}

const store = new EasyStore()

store.on('发布者1', '订阅者1', (context) => {
  console.log('订阅者1获取到了发布者1的内容', context)
})

store.on('发布者1', '订阅者2', (context) => {
  console.log('订阅者2获取到了发布者1的内容', context)
})

store.on('发布者2', '订阅者1', (context) => {
  console.log('订阅者1获取到了发布者2的内容', context)
})


store.emit('发布者1', '大家好  我是发布者1')
store.emit('发布者2', '大家好  我是发布者2')

store.off('发布者1', '订阅者1')

store.emit('发布者1', '大家好  再发一次')
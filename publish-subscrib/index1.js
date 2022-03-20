
// 只有一个发布者，不包含消息类型和发布者


function easyStore() {
  this.store = {}
}

easyStore.prototype = {
  on(id, cb) {
    if (!this.store[id]) {
      this.store[id] = {}
    }
    this.store[id] = {
      id: id,
      notify: cb
    }
  },
  off(id) {
    delete this.store[id]
  },
  emit(context) {
    Object.keys(this.store).forEach(id => {
      this.store[id].notify(context) // 调用方法
    })
  }
}

const store = new easyStore()

store.on('frank', (context) => {
  console.log('frank的订阅者----', context)
})

store.emit('这是发布的内容')

store.off('frank')

store.emit('这是发布的内容')
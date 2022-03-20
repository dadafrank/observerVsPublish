
class Observer { // 订阅者
  constructor(name) {
    this.name = name
  }

  update(context) {
    console.log(this.name, '获取到了消息', context)
  }

}

class Subject {
  constructor() {
    this.observerList = []
  }

  addObserver(observer) { // 添加订阅者
    this.observerList.push(observer)
  }

  removeObserver(observer) {
    const index = this.observerList.findIndex(item => item === observer)
    if (index !== -1) {
      this.observerList.splice(index, 1)
    }
  }

  notify(context) {
    this.observerList.forEach(observer => observer.update(context))
  }
}

const subject1 = new Subject()

const observer1 = new Observer('订阅者1')
const observer2 = new Observer('订阅者2')

subject1.addObserver(observer1)
subject1.addObserver(observer2)

subject1.notify('大家好，我是渣渣辉')

subject1.removeObserver(observer1)

subject1.notify('大家好，渣渣辉卖号给我了')
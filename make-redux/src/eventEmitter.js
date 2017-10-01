class EventEmitter {
  constructor() {
    this.events = {} // holding in each type of functions
    /* exp
    //  {
          hi: [func1, func2],
          bye: [func1, func2]
        }
    */
  }
  on(event, callback) {
    const callbacks = this.events[event] || []

    if(typeof callback === 'function') {
      callbacks.push(callback)
      this.events[event] = callbacks
    }
  }
  emit(event, ...args) {
    const callbacks = this.events[event]

    if(callbacks && callbacks.length > 0) {
      this.events[event].forEach((callback) => callback(...args))
    }
  }
  off(event, callback) {
    if (!this.events[event]) {
      return
    }
    const index = this.events[event].indexOf(callback)
    if(index > -1) {
      this.events[event].splice(index, 1)
    }
  }
}

let emitter1 = new EventEmitter

function foo(name, age) {
  console.log(name, age)
}
function bar(name, age) {
  console.log(name, age, ' again')
}

emitter1.on('hi1', foo)
emitter1.on('hi1', bar)
emitter1.on('hi2', foo)

console.log(emitter1)

emitter1.off('hi1', foo)
emitter1.emit('h1', 'kevin', 18)

emitter1.off('bye', foo)

console.log(emitter1)
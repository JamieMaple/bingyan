# Redux 原理探索

**受之前麦冬学长面试所问的问题所启发而追寻原理，顺便深入理解redux**

> http://huziketang.com/books/react/lesson30

######先挖个坑给自己。。。《JavaScript设计模式》...JavaScript Design Patterns...

---

### EventEmiiter

> https://scriptoj.com/topic/48/36-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-eventemitter

尝试对类 EventEmitter 进行编码，文件在 ./src/eventEmitter 中

---

### (“大声宣告要修改状态”) dispatch 事件而不应该直接修改state状态

1. dispatch 必须有 type
2. 其他字段任意
3. 所有修改必须 dispatch 一个 action 通知

---

### (“几种存储 state 状态”) store 构建，创建一个构建闭包函数`createStore`用于生产 state 与 dispatch 集合

1. `createStore`
``` javascript
function createStore (state, stateChanger) {
  const getState = () => state
  const dispatch = (action) => stateChanger(state, action)
  return { getState, dispatch }
}
```
2. 监控数据变化，应该监听变化，而不应该手工调用 -- -- 观察者模式
3. 监听 action ，向所有订阅者派发事件(依靠数组实现)

改进后的`createStore`

``` javascript
function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}
```

listeners 是所有监听的函数组成的数组，每次调用 dispatch 都会调用`stateChanger`修改数据同时遍历调用所有监听函数。

从几次官方文档说明以及这些源码来看 redux 这样的模式不只针对 React。。由此可见设计模式的重要之处。

**有个小问题不太清楚：监听者每个都要遍历，而随着应用规模的扩大，所耗费的时间和空间都会线性增长，是否真的存在性能隐患**

**大胆妄想**自我想法：redux相当于全局一个集中的状态变量管理器，能够集中处理各个组件之间的通信与状态共享。。但他的代价可能就是这种地方。。。毕竟计算机科学很多时候没有完美解决思路而选取一种折中的办法

---

### 函数式编程的重要理解性概念 -- “老老实实的函数” -- 纯函数（ pure function ）

**1. 函数的返回结果只依赖于它的参数。**
**2. 函数执行过程里面没有副作用。**

这样才能让函数值**可预料的**

### 原始 'redux' 性能优化

通过对 oldState, newState 的不同属性进行浅拷贝然后进行比对覆盖，自此只变更动了的地方，返回整个新 state

1. Object.assign({}, old, new)
2. {...old, new}

这样就给我的感觉很接近 Redux 中的 reducer 的环节的作用了

**stateChanger => reducer**

**reducer 就是一个纯函数**

# Redux 原理探索

*尝试造轮子 -- react-redux*

**受之前麦冬学长面试所问的问题所启发而追寻原理，顺便深入理解redux**

> http://huziketang.com/books/react/lesson30

###### 先挖个坑给自己。。。《JavaScript设计模式》...JavaScript Design Patterns...

---

### EventEmiiter

> https://scriptoj.com/topic/48/36-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-eventemitter

尝试对类 EventEmitter 进行编码，文件在 ./src/emitter 中

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

1. **函数的返回结果只依赖于它的参数**

2. **函数执行过程里面没有副作用**

这样才能让函数值**可预料的**

### 原始 'redux' 性能优化

通过对 oldState, newState 的不同属性进行浅拷贝然后进行比对覆盖，自此只变更动了的地方，返回整个新 state

1. Object.assign({}, old, new)

2. {...old, new}

这样就给我的感觉很接近 Redux 中的 reducer 的环节的作用了

**stateChanger => reducer**

**reducer 就是一个纯函数**

---

### 结合 context 与 store

context 相关：
> https://reactjs.org/docs/context.html

文件在 './src/contextAndStore/'

缺陷:

1. 大量重复逻辑

2. context 依赖过强 、复用不高

这样 connect 高阶组件应运而生

---

### 探索 connect 与 mapStateToProps

> https://reactjs.org/docs/higher-order-components.html

> http://huziketang.com/books/react/lesson28

1. HOC 灵活运用 (其实我不是很理解。。经验太少了)

2. Dumb Components

这样的高阶组件就是**connect()**

(因为它把 Dumb 组件和 context 连接（connect）起来了!)

1. `connect`函数接受一个组件 WrappedComponent 作为参数；

2. 为了把 store 里面的不同数据依据不同需求取出来通过 props 传给 WrappedComponent，`mapStateToProps`应运而生

``` javascript
import React, { Component, PropTypes } from 'react'

// connect 接受一个参数 mapStateToProps 然后返回函数。。。。这个地方两箭头是一个高阶函数。。。
// 开始我看的时候有点蒙。。。嗯。。这大概是柯里化思想的写法体现
// (This is a curried function in ecma-script2015)
// 关于原文里说这是设计缺陷。。。看完函数柯里化解释后我觉得这反而是数学在编程上的理论应用不是缺陷

export const connect = (mapStateToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    render () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())

      return <WrappedComponent {...stateProps} />
    }
  }

  return Connect
}
```

改进版本的mapStateToProps接收俩参数不是很理解。。。

---

### mapDispatchToProps

dispatch 应该也能够通过 connect 进行，进而形成更多 dump components

做法：给 connect 组件传入另一个参数告诉组件需要何时触发 dispatch

``` javascript
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}
```

---

### Provider

需求：清除业务逻辑中公共父组件中的context，使得他看似不存在。。目前的话污染了 Index 组件。。所以得提供一个专门管理 context 的根组件

方法：添加一个根组件，取名叫做 Provider -- 容器组件

---

### dumb and smart
> https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

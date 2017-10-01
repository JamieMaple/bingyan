function renderApp(oldState, newState) {
  if(oldState === newState) { return }
  console.log('render app...')
  renderTitle(oldState.title, newState.title)
  renderContent(oldState.content, newState.content)
}
function renderTitle(oldTitle, newTitle) {
  if(oldTitle === newTitle) { return }
  console.log('render title...')
  const titleDom = document.getElementById('title')
  titleDom.innerHTML = newTitle.text
  titleDom.style.color = newTitle.color
}
function renderContent(oldContent, newContent) {
  if(oldContent === newContent) { return }
  console.log('render content...')
  const contentDom = document.getElementById('content')
  contentDom.innerHTML = newContent.text
  contentDom.style.color = newContent.color
}

function reducer(oldState, action) {
  if (!oldState) {
    return {
      title: {
        text: 'React.js 小书',
        color: 'red',
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
  case 'UPDATE_TITLE_TEXT':
    return {
      ...oldState,
      title: {
        ...oldState.title,
        text: action.text
      }
    }
  case 'UPDATE_TITLE_COLOR':
    return {
      ...oldState,
      title: {
        ...oldState.title,
        color: action.color
      }
    }
  default:
    break
  }
}
function createStore(reducer) {
  let state = null
  const getState = () => (state)
  const listeners = []
  const subscribe = (listener) => (listeners.push(listener))
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})

  return { getState ,dispatch, subscribe }
}

const store = createStore(reducer)

let oldState = store.getState()
store.subscribe(() => {
  const newState = store.getState()
  renderApp(oldState, newState)
  oldState = newState
})
renderApp({}, store.getState())

store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'changed'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'green'})


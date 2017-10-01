let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function renderApp(appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}
function renderTitle(title) {
  const titleDom = document.getElementById('title')
  titleDom.innerHTML = title.text
  titleDom.style.color = title.color
}
function renderContent(content) {
  const contentDom = document.getElementById('content')
  contentDom.innerHTML = content.text
  contentDom.style.color = content.color
}

function stateChanger(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}
function createStore(state, stateChanger) {
  const getState = () => state
  const listeners = []
  const subscribe = (listener) => (listeners.push(listener))
  const dispatch = (action) => {
    stateChanger(state, action),
    listeners.forEach((listener) => listener())
  }

  return { getState, dispatch, subscribe }
}

const store = createStore(appState, stateChanger)

store.subscribe(() => (renderApp(store.getState())))
renderApp(store.getState())

store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'changed'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'green'})


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

function dispatch(action) {
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

renderApp(appState)
dispatch({
  type: 'UPDATE_TITLE_TEXT',
  text: 'changed'
})
dispatch({
  type: 'UPDATE_TITLE_COLOR',
  color: 'green'
})
renderApp(appState)
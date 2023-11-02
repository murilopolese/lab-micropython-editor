const PANEL_HEIGHT = 320

function App(state, emit) {
  if (state.diskNavigationRoot == null) {
    return html`
      <div
        id="app"
        onclick=${() => emit('select-disk-navigation-root')}
        style="cursor: pointer;"
        >
        <p>
          In order to use <strong>Lab for MicroPython Editor</strong>, <br>
          you must choose where to store your files. <br><br>
          Click anywhere to select a folder on your computer.
        </p>
      </div>
    `
  }

  if (state.diskFiles == null) {
    emit('load-disk-files')
    return html`<div id="app"><p>Loading files...</p></div>`
  }

  return state.view == 'editor' ? EditorView(state, emit) : FileManagerView(state, emit)
}

window.addEventListener('load', () => {
  let app = Choo()
  app.use(store);
  app.route('*', App)
  app.mount('#app')

})

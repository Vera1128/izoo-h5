import React from 'react'
import ReactDOM from 'react-dom'
import App from 'src/app'
import './index.scss'


if (module && module.hot) {
  module.hot.accept('./app', () => {
    ReactDOM.render(<App />, document.querySelector('#root'))
  })
}

ReactDOM.render(<App />, document.querySelector('#root'))

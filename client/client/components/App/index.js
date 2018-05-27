import React, { Component } from 'react'
import classnames from 'classnames'
import style from './style.css'

class App extends Component {
  render() {
    return (
      <div className={classnames(style.app)}>
        <header className={classnames(style.header)}>
          Welcome to Joe boilplate project
        </header>
        <div className={classnames(style.content)}/>
      </div>
    )
  }
}

export default App

import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'
import CountDownPanel from '../CountDownPanel'

export default class Header extends Component {
  render() {
    const {add} = this.props
    return (
      <header className={classnames(style.header)}>
        <CountDownPanel add={add} />
      </header>
    )
  }
}

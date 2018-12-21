import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'

export default class Content extends Component {
  render() {
    return <div className={classnames(style.content)} />
  }
}

import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'
import CountDownList from '../CountDownList'
import CountDownPanel from '../CountDownPanel'
import Loader from '../Loader'
import InstallButton from '../InstallButton'

export default class Content extends Component {
  render() {
    const {list, loading, removeItem} = this.props
    const {installable, installApp} = this.props.globalProps

    if (loading) {
      return <Loader />
    }
    return (
      <div className={classnames(style.content)}>
        <CountDownList list={list} remove={removeItem} />
        {installable && <InstallButton install={installApp} />}
      </div>
    )
  }
}

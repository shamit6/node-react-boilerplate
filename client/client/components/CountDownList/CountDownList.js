import React, {Component} from 'react'
import Countdown from './Countdown'
import classnames from 'classnames'
import s from './style.css'

export default class CountDownList extends Component {
  render() {
    const {list, remove} = this.props
    if (list) {
        return <div className={classnames(s.countDownList)}>{list.map(item => <Countdown item={item} key={`${Math.random()}`} remove={remove} />)}</div>
    }
    return null
  }
}

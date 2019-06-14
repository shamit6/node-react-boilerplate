import React, {Component} from 'react'
import Countdown from './Countdown'

export default class CountDownList extends Component {
  render() {
    const {list, remove} = this.props
    if (list) {
      return list.map(item => <Countdown item={item} key={JSON.stringify(item)} remove={remove} />)
    }
    return null
  }
}

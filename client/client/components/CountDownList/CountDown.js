import React, {Component} from 'react'

const done = item => new Date(item.time) - Date.now() <= 0
const changeInterval = 251

export default class CountDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      now: Date.now(),
    }
  }

  componentDidMount() {
    this.resetTime()
  }

  resetTime() {
    setTimeout(() => {
      this.setState({
        now: Date.now(),
      })
      const {item} = this.props

      if (!done(item)) {
        this.resetTime()
      }
    }, changeInterval)
  }

  timeRemaining(item) {
    if (done(item)) {
      return 0
    }
    return Math.floor((new Date(item.time) - Date.now()) / 1000)
  }

  render() {
    const {item, remove} = this.props

    return (
      <div>
        <button onClick={() => remove(item)}>-</button>
        {item.name} {this.timeRemaining(item)}
      </div>
    )
  }
}

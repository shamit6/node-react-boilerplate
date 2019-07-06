import React, {Component} from 'react'
import style from './style.css'
import CircleProgressBar from './CircleProgressBar'

const done = item => new Date(item.time) - Date.now() <= 0
const changeInterval = 251
const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

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
      return 'Done 🥂'
    }
    const seconds = Math.ceil((new Date(item.time) - Date.now()) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    if (days > 1) {
      return `${formatNumber(days)} Days`
    } else if (hours > 1) {
      return `${formatNumber(hours)} Hours`
    } else if (minutes > 1) {
      return `${formatNumber(minutes)} Minutes`
    } else {
      return `${formatNumber(seconds)} Seconds`
    }
  }

  render() {
    const {item, remove} = this.props

    return (
      <div className={style.countDownItem}>
        <button className={style.removeButton} onClick={() => remove(item)}>
          🗑️
        </button>
        <div className={style.itemName}>{item.name}</div>
        <CircleProgressBar progress={90} title={item.name} text={this.timeRemaining(item)} color="rgb(104, 214, 198)" />
      </div>
    )
  }
}

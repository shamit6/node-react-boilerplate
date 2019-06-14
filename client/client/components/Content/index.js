import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'
import CountDownList from '../CountDownList'
import CountDownPanel from '../CountDownPanel'
import Loader from '../Loader'

export default class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: null,
      loading: true,
    }
  }

  componentDidMount() {
    const countdowns = JSON.parse(localStorage.getItem('countdowns'))
    this.setState({
      list: countdowns,
      loading: false,
    })
  }

  persist(list) {
    localStorage.setItem('countdowns', JSON.stringify(list))
  }

  addItem(item) {
    const newList = [...(this.state.list || []), item]
    this.setState({
      list: newList,
    })
    this.persist(newList)
  }

  removeItem(item) {
    const newList = (this.state.list || []).filter(cur => cur != item)
    this.setState({
      list: newList,
    })
    this.persist(newList)
  }

  render() {
    const {list, loading} = this.state

    if (loading) {
      return <Loader />
    }
    return (
      <div className={classnames(style.content)}>
        <CountDownPanel add={this.addItem.bind(this)} />
        <CountDownList list={list} remove={this.removeItem.bind(this)} />
      </div>
    )
  }
}

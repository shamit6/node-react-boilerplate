import React, {Component} from 'react'

export default class Store extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: null,
      loading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const countdowns = JSON.parse(localStorage.getItem('countdowns'))
      this.setState({
        list: countdowns,
        loading: false,
      })
    }, 100)
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
    const {render} = this.props

    return render({list, loading, addItem: this.addItem.bind(this), removeItem: this.removeItem.bind(this)})
  }
}

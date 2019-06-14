import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from '../../components/Header'
import Content from '../../components/Content'

export default class RouterContent extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route component={Header} exact path="/" />
          <Switch>
            <Route component={Content} exact path="/" />
          </Switch>
        </React.Fragment>
      </Router>
    )
  }
}

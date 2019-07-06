import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from '../../components/Header'
import Content from '../../components/Content'
import Store from '../Store'

export default ({globalProps}) => (
  <Store
    render={({list, loading, addItem, removeItem}) => (
      <Router>
        <React.Fragment>
          <Route render={routeProps => <Header {...routeProps} add={addItem} />} exact path="/" />
          <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <Content {...routeProps} {...{list, loading, removeItem}} globalProps={globalProps} />
              )}
            />
          </Switch>
        </React.Fragment>
      </Router>
    )}
  />
)

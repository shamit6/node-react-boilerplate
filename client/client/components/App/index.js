import React from 'react'
import classnames from 'classnames'
import style from './style.css'
import Router from '../../containers/Router'

export default globalProps => (
  <div className={classnames(style.app)}>
    <Router globalProps={globalProps} />
  </div>
)

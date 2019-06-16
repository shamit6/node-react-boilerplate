import React, {useState, useEffect} from 'react'
import classnames from 'classnames'
import style from './style.css'
import Router from '../../containers/Router'

let installPrompt = null

const registerServiceWorker = setInstallable => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    })

    window.addEventListener('beforeinstallprompt', event => {
      // Don't show the install popup without the user asking for it
      event.preventDefault()

      // Save event for later
      installPrompt = event
      setInstallable(true)

      // Show or enable install button in your app
    })
  }
}

export default () => {
  const [installable, setInstallable] = useState(false)
  useEffect(registerServiceWorker.bind(registerServiceWorker, setInstallable), [])

  const installApp = async () => {
    // Show prompt to user
    installPrompt.prompt()

    const installed = await installPrompt.userChoice
    console.log(`User installed app: ${installed}`)

    // Clean up. Prompt cannot be reused.
    installPrompt = null
    setInstallable(false)
  }

  return (
    <div className={classnames(style.app)}>
      <Router globalProps={{installable, installApp}} />
    </div>
  )
}

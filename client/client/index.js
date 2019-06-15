import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

let installPrompt = null

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
    render(installPrompt)

    // Show or enable install button in your app
  })
}

const installApp = async () => {
  // Show prompt to user
  installPrompt.prompt()

  const installed = await installPrompt.userChoice
  console.log(`User installed app: ${installed}`)

  // Clean up. Prompt cannot be reused.
  installPrompt = null
  render(installPrompt)
}

const render = installable => {
  ReactDOM.render(<App installApp={installApp} installable={installable} />, document.getElementById('root'))
}

render(installPrompt)

/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: {
      scope: process.env.BASE_URL,
    },
    ready () {
      
    },
    registered () {
      
    },
    cached () {
      
    },
    updatefound () {
      
    },
    updated () {
      
    },
    offline () {
      
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

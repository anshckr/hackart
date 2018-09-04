import { applyMiddleware, createStore, compose } from 'redux'

import reducer from './reducers'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import { createLogger } from 'redux-logger'
import { isBrowserEnv } from './devTools'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

const logger = createLogger({
  diff: true,
  collapsed: true
})

function callAndRemoveFalsyArgs (cb, args, context) {
  return cb.apply(context, args.filter(arg => !!arg))
}

let preloadedState

// Grab the state from a global injected into server-generated HTML
if (isBrowserEnv()) {
  preloadedState = window.hackcart.PRELOADED_STATE

  // Load states from localStorage if they exist.
  const persistentStates = {
    cart: preloadedState.cart
  }

  Object.keys(persistentStates).forEach(key => {
    const storedState = localStorage.getItem(key)

    if (storedState) {
      try {
        Object.assign(persistentStates[key], JSON.parse(storedState))
      } catch (e) {
        // todo: log this on sentry
      }
    }
  })
}

function pathSlicer (paths) {
  const getSubtree = (subtree, key) => {
    if (key.indexOf('.') > -1) {
      const remaining = key.split('.').slice(1).join('.')
      return getSubtree(subtree[key.split('.')[0]], remaining)
    }
    return subtree[key]
  }

  return (state) => getSubtree(state, paths)
}

function tabSync (store) {
  isBrowserEnv() && window.addEventListener('storage', (e) => {
    if ([].indexOf(e.key) !== -1 && (e.oldValue !== e.newValue)) {
      const action = {}
      action.type = `SYNC_${e.key.toUpperCase()}`
      action[e.key] = JSON.parse(e.newValue)

      store.dispatch(action)
    }
  }, false)
}

const createCustomStore = (debug = false) => {
  const middlewares = [thunk]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }

  const store = createStore(
    reducer,
    preloadedState,
    callAndRemoveFalsyArgs(compose, [
      applyMiddleware(...middlewares),
      applyMiddleware(routerMiddleware(browserHistory)),
      isBrowserEnv() ? (
        persistState('cart', {
          key: 'cart',
          slicer: pathSlicer
        })
      ) : null
    ], this)
  )
  tabSync(store)
  return store
}

export default createCustomStore

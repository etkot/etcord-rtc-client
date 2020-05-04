/* eslint-disable no-underscore-dangle */

/**
 * Configure redux store and axios middleware
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import rootReducer from '../Reducers'
import { socketMiddleware } from '../Socket'

// Create client alias
// Used in action creators
const client = axios.create({
    baseURL: process.env.TEST_API || 'https://localhost:5000',
    responseType: 'json',
})

const axiosMiddlewareOptions = {
    interceptors: {
        request: [
            ({ getState }, req) => {
                const { token } = getState().user
                const newReq = { ...req }
                if (token) {
                    newReq.headers.authorization = `Bearer ${token}`
                }
                return newReq
            },
        ],
    },
}

// Config redux-persist
const persistConfig = {
    key: 'etcord-root',
    storage,
    blacklist: [],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Define redux middleware to use
const tools = [
    applyMiddleware(thunk, axiosMiddleware(client, axiosMiddlewareOptions), socketMiddleware),
]

// If user has redux dev tools installed and we are using development build allow usage of dev tools
if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__)
    tools.push(window.__REDUX_DEVTOOLS_EXTENSION__())

// Create redux store
const store = createStore(persistedReducer, compose(...tools))
const persistor = persistStore(store)

export { store, persistor }

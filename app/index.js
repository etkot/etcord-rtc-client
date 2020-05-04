import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import { hot } from 'react-hot-loader/root'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import './index.css'

import { store, persistor } from './Config'

import App from './Routes'

const AppContainer = process.env.START_HOT ? Fragment : ReactHotAppContainer

const theme = {
    colors: {
        main: '#c9c9c9',
        background: 'rgba(169, 34, 36, 0.08)',
        highlight: '#d6ebd5',
        accent: '#32a852',
        text: 'rgba(255, 255, 255, 0.8)',
        grayed: 'rgba(255, 255, 255, 0.6)',
    },
    border: {
        default: '1px solid #f0f0f0',
    },
}

const MainComponent = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>
)

const Hot = hot(MainComponent)

const MainComponentWrapper = () => (
    <AppContainer>
        <Hot />
    </AppContainer>
)

document.addEventListener('DOMContentLoaded', () =>
    render(<MainComponentWrapper />, document.getElementById('root'))
)

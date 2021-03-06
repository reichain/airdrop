// import 'assets/fontawesome-pro-5.15.3/css/all.min.css'

import 'assets/scss/themes/all.scss'
import EtherProvider from 'components/EtherProvider/EtherProvider'
import SnackbarProviderWrapper from 'components/SnackbarProviderWrapper/SnackbarProviderWrapper'
import ThemeProvider from 'components/ThemeProvider/ThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'

ReactDOM.render(
    <HashRouter>
        <ThemeProvider>
            <SnackbarProviderWrapper>
                <EtherProvider>
                    <App />
                </EtherProvider>
            </SnackbarProviderWrapper>
        </ThemeProvider>
    </HashRouter>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

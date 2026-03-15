import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import store from './store'
import App from './App'
import './styles/global.css'
import {StyledEngineProvider} from "@mui/material";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <Provider store={store}>
                <HashRouter>
                    <App />
                </HashRouter>
            </Provider>
        </StyledEngineProvider>
    </React.StrictMode>
)
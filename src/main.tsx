import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/Store.ts";
import {CircularProgress} from "@mui/material";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <Suspense fallback={<CircularProgress/>}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Suspense>

        </React.StrictMode>
    </Provider>
)

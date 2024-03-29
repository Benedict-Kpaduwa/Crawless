import React from 'react'
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import { createRoot } from "react-dom/client";
import {store} from './redux/store';
import {Provider} from 'react-redux'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
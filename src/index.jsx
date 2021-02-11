import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import "./index.css";

import { store } from './redux/store/store';

const helmetContext = {};

ReactDOM.render(
  <React.StrictMode>
    <Provider  store={store}>
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

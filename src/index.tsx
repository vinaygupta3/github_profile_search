import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

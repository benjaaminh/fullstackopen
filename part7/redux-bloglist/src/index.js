import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reduxStore from "./store";

import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </Router>,
);

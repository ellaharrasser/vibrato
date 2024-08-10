import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { router } from "./router";
import configureStore from "./redux/store";
import * as sessionActions from "./redux/session";
import * as productsActions from "./redux/products";
import * as shopActions from "./redux/shops";
import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store; // Expose store/actions in development for testing
  window.sessionActions = sessionActions;
  window.productsActions = productsActions;
  window.shopActions = shopActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>,
);

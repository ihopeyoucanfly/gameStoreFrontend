import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";
import { CategoriesProvider } from "./providers/CategoriesProvider";
import { ProductsProvider } from "./providers/ProductsProvider";

import App from "./App";

import "./assets/styles/globals.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <ProductsProvider>
      <CategoriesProvider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </CategoriesProvider>
    </ProductsProvider>
  </AuthProvider>
);

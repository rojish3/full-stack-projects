import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./Context/userProvider.tsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ProductProvider } from "./Context/productProvider.tsx";
import { AllUserProvider } from "./Context/Context.tsx";
import { RequestProvider } from "./Context/requestContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AllUserProvider>
      <UserProvider>
        <ProductProvider>
          <RequestProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </RequestProvider>
        </ProductProvider>
      </UserProvider>
    </AllUserProvider>
  </React.StrictMode>
);

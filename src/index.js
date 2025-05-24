import "react-app-polyfill/stable";
import "core-js";

import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./root";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./configuration/store";
import "./scss/style.scss";

//fonts
import "./fonts/Roboto/Roboto-Regular.ttf";
import "./fonts/Nunito_Sans/NunitoSans_7pt-Regular.ttf";
import SidebarDrawer from "./components/AppBar";
import { ProSidebarProvider } from "react-pro-sidebar";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';
import { Roboto } from 'google-fonts'; // Import Roboto font
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalSpinnerWrapper from "./utilities/Spinner";
import SendMailSpinner from "./utilities/DocumentShareSpinner";

WebFont.load({
  google: {
    families: ['Pacifico', 'cursive'], // Replace 'Pacifico' with the name of the cursive font you want to use
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <div
      style={{  
        display: "flex",
      }}
    > */}
    {/* <BrowserRouter> */}
    <GlobalSpinnerWrapper />
    <SendMailSpinner />
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {/* </BrowserRouter> */}
    {/* <ProSidebarProvider>
        <SidebarDrawer />
        <Root/>
      </ProSidebarProvider>
    </div> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

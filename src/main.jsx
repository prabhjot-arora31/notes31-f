import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import HomePage from "./pages/HomePage.jsx";
import DetailNote from "./components/DetailNote.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Footer from "./components/Notification.jsx";
import Notification from "./components/Notification.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Notification />
      <Routes>
        <Route path="/" exact element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/home/:id" element={<HomePage />} />
        <Route exact path="/note/:id" element={<DetailNote />} />
        <Route exact path="/home/profile/:id" element={<ProfilePage />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

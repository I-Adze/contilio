import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import "./App.scss";
import { LoginPage } from "./login/LoginPage";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;

import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import "./App.scss";
import { Dashboard } from "./dashboard/Dashboard";
import { LoginPage } from "./login/LoginPage";

/**
 * I chose to use react-router as it's what I'm most familiar with and seems to be the defacto option
 * at the moment. I did have to write a small wrapper to make it work with class components in the
 * latest version, but this seemed preferable to using an older version.
 *
 * I used css modules to scope css to each component as I feel breaking up css like this makes it much
 * more manageable. If there were more elements I'd also likely have global classes or styles in App.scss,
 * but that wasn't necessary on a project this small as global body styles covered most of that.
 *
 * I didn't make use of style/component libraries like materialUI or chakra, purely to show off my own
 * knowledge, but I normally use one of those to expedite things.
 */
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;

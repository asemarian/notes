import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { AuthContext } from './context/auth';
import { ThemeContext } from './context/theme';
import useDarkMode from './hooks/useDarkMode';
import axios from 'axios';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { darkMode, setDarkMode } = useDarkMode();
  useEffect(() => {
    setDarkMode(localStorage.getItem("theme") === "dark");
  }, []);
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;

  useEffect(() => {
    axios.post("/users/validate-token", { token })
      .then(({ data: { isValid } }) => {
        if (!isValid) {
          setToken("");
          localStorage.setItem("token", "");
        }
      })
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ token, setToken }} >
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          <Switch>
            <Redirect from="/" to="/notes" exact />
            <Route exact path="/notes" render={() => token ? <Home /> : <Redirect to="/login" />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" render={() => <Redirect to="/notes" />} />
          </Switch>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </>
  );
}
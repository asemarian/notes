import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { AuthContext } from './context/auth';
import { ThemeContext } from './context/theme';
import useDarkMode from './hooks/useDarkMode';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    setDarkMode(localStorage.getItem("theme") !== "light");
  }, [setDarkMode]);

  useEffect(() => {
    axios.post("/users/validate-token", { token })
      .then(({ data: { isValid } }) => {
        if (!isValid) {
          setToken("");
          localStorage.setItem("token", "");
        }
      })
  }, [token]);

  axios.defaults.headers.common['Authorization'] = "Bearer " + token;

  return (
    <>
      <AuthContext.Provider value={{ token, setToken }} >
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          <Switch>
            <Route exact path="/" render={() => token ? <Home /> : <Redirect to="/login" />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" render={() => <Redirect to="/" />} />
          </Switch>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </>
  );
}
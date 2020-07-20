import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../pages/Main';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import useDarkMode from '../hooks/useDarkMode';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const { theme, setDarkMode } = useDarkMode();
  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken }} >
        <ThemeContext.Provider value={{ theme, setDarkMode }}>
          <Switch>
            <Redirect from="/" to="/notes" exact />
            <Route exact path="/notes" render={() => <Main />} />
            <Route exact path="/notes/:id" render={() => <Main />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/signup" render={() => <Signup />} />
          </Switch>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div >
  );
}
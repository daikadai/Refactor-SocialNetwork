import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import themeFile from './util/theme';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Navbar from './components/Navbar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthRoute from './util/AuthRoute';
import JwtDecode from 'jwt-decode';
import { logoutUser, getUserData } from './redux/user/user.action';
import { SET_AUTHENTICATED } from './redux/types';
import Axios from 'axios';
import User from './pages/User';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = JwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <AuthRoute exact path="/login" component={Login}/>
                <AuthRoute exact path="/signup" component={SignUp}/>
                <Route exact path="/users/:handle" component={User}/>
                <Route exact path="/users/:handle/scream/:screamId" component={User}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;

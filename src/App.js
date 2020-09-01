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

const theme = createMuiTheme(themeFile)

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
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;

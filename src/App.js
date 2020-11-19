import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
//logo icon for tap
//https://www.flaticon.com/free-icon/love_2950226?term=love&page=1&position=49

//https://v3.material-ui.com/api/mui-theme-provider/
//https://v3.material-ui.com/customization/themes/
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwt_decode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
//import AuthSignup from './util/AuthSignup';
//npm install --save react-router-dom
import Navbar from './components/Navbar';
//pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MaybePage from './pages/MaybePage';
import MatchPage from './pages/MatchPage';
import AccountPage from './pages/AccountPage';
import Member from './pages/Member';

//[redux] ---> state, event, actions, dispatcher, store, reducer, state
//npm install --save redux react-redux redux-thunk
//https://github.com/zalmoxisus/redux-devtools-extension
import { Provider } from 'react-redux';
import store from './redux/store';
//in order to replace "autenticated"
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

import axios from 'axios';

axios.defaults.baseURL="https://us-central1-i-match-7689e.cloudfunctions.net/api";
//this fixed the proxy problems!!!
// https://stackoverflow.com/questions/47824521/create-react-app-doesnt-work-with-proxy/52797226
//npm install --save @material-ui/core
//https://material-ui.com/customization/color/
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#455a64',
      main: '#37474f',
      dark: '#263238',
      contrastText: '#fff'
    },
    secondary: {
      light: '#f57c00',
      main: '#ef6c00',
      dark: '#e65100',
      contrastText: '#fff'
    }
  }
});

////*let authenticated;
//npm install --save jwt-decode
const token = localStorage.FBToken;

//npm install --save jwt-decode
//https://firebase.google.com/docs/auth/admin/verify-id-tokens
//Find the token: DevTools->application->Storage->local storage
if(token) {
  const decodedToken = jwt_decode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login' //this part can make an error!
    ////*authenticated = false;
  } else {
    ////*authenticated = true;
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authoization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
              <Router>
                <Navbar />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <AuthRoute exact path="/login" component={LoginPage}  />
                    <AuthRoute exact path="/signup" component={SignupPage} />
                    <Route exact path="/maybe" component={MaybePage} />
                    <Route exact path="/match" component={MatchPage} />
                    <Route exact path="/account" component={AccountPage}/>
                    <Route exact path="/users/:handle" component={Member}/>
                    {/*<Route component={NotFoundPage} />*/}
                  </Switch>
                </div>
              </Router>
            </div>
          </Provider> 
      </MuiThemeProvider>
    );
  }

}
//<AuthRoute exact path="/login" component={LoginPage}  authenticated={authenticated}/>
export default App;

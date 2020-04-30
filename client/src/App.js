import React, { Fragment } from 'react';
import Navbar from './components/Layout/Navbar';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../containers/Header';
import Home from '../containers/Home';
import Profile from '../containers/Profile';
import AuthUser from './AuthUser';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/profile/:id" component={Profile} />
        </main>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../containers/Header';
import Home from '../containers/Home';
import Profile from '../containers/Profile';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile/:id" component={Profile} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

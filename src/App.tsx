import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Auth from './pages/Auth';
import Main from './pages/Main';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/main" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

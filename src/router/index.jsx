import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../views/Login';
import Layout from '../views/Layout';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Layout} />
    </Switch>
  );
}

export default App;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../views/Login';
import Layout from '../views/Layout';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Layout} />
      {/* <Route path="/write" exact component={Page} />
      <Route path="/articles" exact component={Page} />
      <Route path="/types" exact component={Page} />
      <Route path="/tags" exact component={Page} />
      <Route path="/introduce" exact component={Page} /> */}
      <Redirect to="/" />
    </Switch>
  );
}

export default App;

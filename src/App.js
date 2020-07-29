import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Register from './views/register';
import Login from './views/login';
import UpdateProfile from './views/updateprofile';

import NotFound from './views/notfound';

import injectContext from './store/appContext';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={UpdateProfile} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default injectContext(App);

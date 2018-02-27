import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/home';
import Layout from './hoc/layout';
import TeaView from './components/tea';
import LogIn from './containers/admin/login';
import Auth from './hoc/auth';
import User from './components/admin';
import CreateTea from './containers/admin/create';
import UserTeas from './components/admin/userTeas';

const Routes = () => {

  return (
    <Layout>
      <Switch>
        <Route path = "/" exact component = { Auth(Home, null) } />
        <Route path = "/login" exact component = { Auth(LogIn, false) } />
        <Route path = "/tea/:id" exact component = { Auth(TeaView, true) } />
        <Route path = "/user" exact component = { Auth(User, true) } />
        <Route path = "/user/create" exact component = { Auth(CreateTea, true) } />
        <Route path = "/user/user-teas" exact component = { Auth(UserTeas, true) } />
    </Switch>
    </Layout>
  );
};

export default Routes;

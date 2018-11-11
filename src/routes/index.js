import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import Loadable from 'react-loadable';

// import Home from '@/pages/Home/Home';
// import About from '@/pages/About/About';

const Loading = () => (<div>loading...</div>);

const Home = Loadable({
  loader: () => import('@/pages/Home/Home'),
  loading: Loading,
  delay: 200
});

const About = Loadable({
  loader: () => import('@/pages/About/About'),
  loading: Loading
});

const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Redirect to="/home" />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

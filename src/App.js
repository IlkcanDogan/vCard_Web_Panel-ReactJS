import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Pages from './pages';


function App() {
  return (
    <Router /*basename='/'*/>
      <Switch>
        {Pages.map((page, index) => { return (<Route key={index} exact {...page} />) })}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
export default App;
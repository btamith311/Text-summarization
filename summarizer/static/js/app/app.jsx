import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home';
import About from '../pages/about';
import styled from 'styled-components/macro';
import AppBar from './app_bar';

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1em;
`;

const App = () => (
  <>
    <AppBar />
    <Main>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/api' component={About} />
      </Switch>
    </Main>
  </>
);

export default App;

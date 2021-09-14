// == Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Route, Switch, Redirect } from 'react-router-dom';

// Composants
import NotFound from 'src/components/NotFound';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

import './styles.scss';
import Boardgames from '../Boardgames';

const BASE_URL = 'http://localhost:3333';

// == Composant
const App = () => {

  return (
    <div className="ludorganizer">
      <Header />
      <Switch>
        <Route>
          <Boardgames />
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
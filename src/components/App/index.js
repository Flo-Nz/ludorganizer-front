// == Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Route, Switch, Redirect } from 'react-router-dom';

// Composants
import NotFound from 'src/components/NotFound';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import useGet from 'src/hooks/useGet';

import './styles.scss';
import Boardgames from '../Boardgames';

const BASE_URL = 'http://localhost:3000/v1';

// == Composant
const App = () => {

  const [boardgames, bgLoading] = useGet(`${BASE_URL}/boardgames`);
  const [categories, catLoading] = useGet(`${BASE_URL}/categories`);

  return (
    <div className="ludorganizer">
      <Header />
      <Switch>
        <Route path="/boardgames">
        {
          !bgLoading && <Boardgames boardgames={boardgames} categories={categories} />
        }
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
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
import AddForm from '../AddForm';
import apiUrl from '../../utils/api-url';

// == Composant
const App = () => {

  const [loading, setLoading] = useState(false);
  const [boardgames, setBoardgames] = useState([]);
  const [categories, catLoading] = useGet(`${apiUrl}/categories`);
  const [themes, themesLoading] = useGet(`${apiUrl}/themes`);
  const [difficulties, diffLoading] = useGet(`${apiUrl}/difficulties`);  
  const [lastGameModified, setLastGameModified] = useState('');
  
  const fetchBoardgames = () => {
      setLoading(true);
      axios({
          method: 'get', 
          url: apiUrl + '/boardgames'
      })
          .then((res) => {
              const {data} = res;
              setBoardgames(data);
          })
          .catch((err) => {
              console.log(err);   
          })
          .finally(() => {
              setLoading(false);
          })
  }

  useEffect(() => {
      fetchBoardgames();
  }, [lastGameModified]);

  return (
    <div className="ludorganizer">
      <Header />
      <Switch>
        <Route path="/boardgames">
        {
          !loading && <Boardgames boardgames={boardgames} categories={categories} />
        }
        </Route>
        <Route path="/signin">
          
        </Route>
        <Route path="/addbg">
          <AddForm 
            categories={categories} 
            themes={themes} 
            difficulties={difficulties} 
            setLastGameModified={setLastGameModified}
            setLoading={setLoading}
          />
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
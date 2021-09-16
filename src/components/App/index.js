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

const BASE_URL = 'http://localhost:3000/v1';

// == Composant
const App = () => {

  const bgDefaultValues = {
    bgTitle: '',
    bgMinPlayers: '',
    bgMaxPlayers: '',
    bgDuration: '',
    bgPictureUrl: '',
    bgCategories: [],
    bgThemes: [],
    bgDifficulty: ''
  }
  const [boardgames, bgLoading] = useGet(`${BASE_URL}/boardgames`);
  const [categories, catLoading] = useGet(`${BASE_URL}/categories`);
  const [themes, themesLoading] = useGet(`${BASE_URL}/themes`);
  const [difficulties, diffLoading] = useGet(`${BASE_URL}/difficulties`);  
  const [addFormData, setAddFormData] = useState(bgDefaultValues);
  const [addFormError, setAddFormError] = useState(false);
  const [addFormErrorMsg, setAddFormErrorMsg] = useState('');
  const [addFormSubmitError, setAddFormSubmitError] = useState(false);
  const [addFormSubmitErrorMsg, setAddFormSubmitErrorMsg] = useState('');
  
  const handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'bgCategories' || name === 'bgThemes') {
      const options = evt.target.options;
      const value = [];
      for (const option of options) {
        if (option.selected) {
          value.push(option.value);
        }
      }
      setAddFormError(false);
      const newAddFormData = {...addFormData};
      newAddFormData[name] = value;
      setAddFormData(newAddFormData);
      return;
    }

    if (name === 'bgMinPlayers' && addFormData.bgMaxPlayers !== '') {
      if (value !== '' && parseInt(value) > parseInt(addFormData.bgMaxPlayers)) {
        setAddFormErrorMsg(`Le nombre de joueurs minimum ne peut pas être supérieur au nombre maximum de joueurs.`)
        setAddFormError(true);
        return;
      }
    }

    if (name === 'bgMaxPlayers' && addFormData.bgMinPlayers !== '') {
      if (value !== '' && parseInt(value) < parseInt(addFormData.bgMinPlayers)) {
        setAddFormErrorMsg(`Le nombre de joueurs maximum ne peut pas être inférieur au nombre minimum de joueurs.`)
        setAddFormError(true);
        return;
      }
    }

    if (name === 'bgDuration') {
      if (value !== '' && parseInt(value) === 0) {
        setAddFormErrorMsg(`La durée d'un jeu ne peut pas être de ${value} minute.`);
        setAddFormError(true);
        return;
      }
    }

    setAddFormError(false);
    const newAddFormData = {...addFormData};
    newAddFormData[name]= value;
    setAddFormData(newAddFormData);
  }

  const handleAddForm = (data) => {
    // On commence par regarder si les données sont complétées. S'il manque une donnée, on return un message d'erreur.
    for (const prop in data) {

      if (data[prop] === null || data[prop] === undefined || data[prop] === '') {
        const champ = prop.slice(2);  
        setAddFormErrorMsg(`Le champ ${champ} n'est pas rempli correctement.`);
        setAddFormError(true);    

      } else if (prop === 'bgCategories' || prop === 'bgThemes') {
        if (data[prop].length === 0) {
          const champ = prop.slice(2);  
          setAddFormErrorMsg(`Le champ ${champ} n'est pas rempli correctement.`);
          setAddFormError(true);  
        } 
      }
    }
    // On check si les informations de base sont correctes concernant les champs 
  }

  return (
    <div className="ludorganizer">
      <Header />
      <Switch>
        <Route path="/boardgames">
        {
          !bgLoading && <Boardgames boardgames={boardgames} categories={categories} />
        }
        </Route>
        <Route path="/addbg">
          <AddForm 
            categories={categories} 
            themes={themes} 
            difficulties={difficulties} 
            handleAddForm={handleAddForm} 
            handleInputChange={handleInputChange} 
            addFormData={addFormData} 
            addFormError={addFormError}
            addFormErrorMsg={addFormErrorMsg}
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
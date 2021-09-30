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
import { number } from 'prop-types';

const BASE_URL = 'http://localhost:3000/v1';

// == Composant
const App = () => {

  const bgDefaultValues = {
    bgTitle: '',
    bgMinPlayers: '',
    bgMaxPlayers: '',
    bgDuration: '',
    bgMinAge: '',
    bgPictureUrl: '',
    bgCategories: [],
    bgThemes: [],
    bgDifficulty: '1'
  }
  const bgDefaultError = {
    bgTitle: false,
    bgMinPlayers: false,
    bgMaxPlayers: false,
    bgDuration: false,
    bgMinAge: false,
    bgPictureUrl: false,
    bgCategory1: false,
    bgCategory2: false,
    bgCategory3: false,
    bgTheme1: false,
    bgTheme2: false,
    bgTheme3: false,
    bgDifficulty: false
  }
  const bgDefaultErrorMsg = {
    bgTitle: '',
    bgMinPlayers: '',
    bgMaxPlayers: '',
    bgDuration: '',
    bgMinAge: '',
    bgPictureUrl: '',
    bgCategory1: '',
    bgCategory2: '',
    bgCategory3: '',
    bgTheme1: '',
    bgTheme2: '',
    bgTheme3: '',
    bgDifficulty: ''
  }

  const [loading, setLoading] = useState(false);
  const [boardgames, setBoardgames] = useState([]);
  const [categories, catLoading] = useGet(`${BASE_URL}/categories`);
  const [themes, themesLoading] = useGet(`${BASE_URL}/themes`);
  const [difficulties, diffLoading] = useGet(`${BASE_URL}/difficulties`);  
  const [addFormData, setAddFormData] = useState(bgDefaultValues);
  const [addFormError, setAddFormError] = useState(bgDefaultError);
  const [addFormErrorMsg, setAddFormErrorMsg] = useState(bgDefaultErrorMsg);
  const [lastGameModified, setLastGameModified] = useState('');
  
  const fetchBoardgames = () => {
      setLoading(true);
      axios({
          method: 'get', 
          url: BASE_URL + '/boardgames'
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
  

  const handleInputChange = (evt) => {
    // Pour des soucis de lisibilité, on va stocker target, value, name dans des variables.
    const target = evt.target;
    // Value pourrait éventuellement être une checkbox donc on utilise une ternaire simple pour récupérer le checked dans ce cas, sinon target.value classique.
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

      if (name.includes('bgCategory')) {
        setAddFormError(bgDefaultError);
        setAddFormErrorMsg(bgDefaultErrorMsg)
        const newAddFormData = {...addFormData};
        // On récupère le numéro de la catégorie choisie grâce au name qui termine par son numéro.
        const index = parseInt(name.substring(name.length - 1)) - 1;
        newAddFormData.bgCategories[index] = value;
        setAddFormData(newAddFormData);
        return;
      }

      if (name.includes('bgTheme')) {
        setAddFormError(bgDefaultError);
        setAddFormErrorMsg(bgDefaultErrorMsg)
        const newAddFormData = {...addFormData};
        newAddFormData.bgThemes.push(value);
        setAddFormData(newAddFormData);
        return;
      }
      
    /*
     * Gestion des cas d'erreur / exceptions
     * 
     */
    if (name === 'bgTitle') {
      // On ne peut pas commencer par un espace
      if (value !== '' && value === ' ') {
        const errorMsg = {...addFormErrorMsg};
        errorMsg[name]= "Le titre d'un jeu ne peut commencer par un espace";
        setAddFormErrorMsg(errorMsg);
        const error = {...addFormError};
        error[name] = true;
        setAddFormError(error);
        return;
      } 
      
      // On ne peut pas mettre deux espaces à la suite
      if (value.length > 1 && value.substring(value.length - 2, value.length - 1) === ' ' && value.substring(value.length - 1) === ' ') {
        return;
      }
    }

    // On vérifie que seuls des chiffres sont entrés.
    if (name === 'bgMinPlayers' || name === 'bgMaxPlayers' || name === 'duration' || name === 'bgMinAge') {
      if (isNaN(parseInt(value)) && value !== '') {
        return;
      }
      if (isNaN(parseInt(value.substring(value.length - 1))) && value !== '')
        return;
    }

    if (name === 'bgMinPlayers' && addFormData.bgMaxPlayers !== '') {
      if (value !== '' && parseInt(value) > parseInt(addFormData.bgMaxPlayers)) {
        const errorMsg = {...addFormErrorMsg};
        errorMsg[name]= "Joueurs minimum ne peut être supérieur au maximum.";
        setAddFormErrorMsg(errorMsg);
        const error = {...addFormError};
        error[name] = true;
        setAddFormError(error);
        return;
      } 
    }

    if (name === 'bgMaxPlayers' && addFormData.bgMinPlayers !== '') {
      if (value !== '' && parseInt(value) < parseInt(addFormData.bgMinPlayers)) {
        const errorMsg = {...addFormErrorMsg};
        errorMsg[name]= "Joueurs max ne peut être inférieur au minimum.";
        setAddFormErrorMsg(errorMsg);
        const error = {...addFormError};
        error[name] = true;
        setAddFormError(error);
        return;
      }
    }

    if (name === 'bgDuration') {
      if (value !== '' && parseInt(value) === 0) {
        const errorMsg = {...addFormErrorMsg};
        errorMsg[name]= `La durée d'un jeu ne peut pas être de ${value} minute.`;
        setAddFormErrorMsg(errorMsg);
        const error = {...addFormError};
        error[name] = true;
        setAddFormError(error);
        return;
      }
    }

    if (name === 'bgMinAge') {
      if (value !== '' && (parseInt(value) === 0 || parseInt(value) > 18) ) {
        const errorMsg = {...addFormErrorMsg};
        errorMsg[name]= `L'âge minimum ne peut être de ${value}.`;
        setAddFormErrorMsg(errorMsg);
        const error = {...addFormError};
        error[name] = true;
        setAddFormError(error);
        return;
      }
    }

    // Si tout se passe correctement, alors il n'y a plus d'erreur, on propage les données d'addformdata dans un nouvel objet pour respecter la programmation fonctionnelle, puis on écrase dans ce nouvel objet la valeur qui nous intéresse avant de mettre à jour le state avec ce nouvel objet.

    setAddFormError(false);
    setAddFormErrorMsg(bgDefaultErrorMsg)
    const newAddFormData = {...addFormData};
    newAddFormData[name]= value;
    setAddFormData(newAddFormData);
  }

  const handleAddForm = (newBg) => {
    // On commence par regarder si les données sont complétées. S'il manque une donnée, on return un message d'erreur.
    for (const prop in newBg) {
      // Si une des propriétés de notre objet data a une valeur null, undefined ou string vide, on ne continue pas et on met à jour le message d'erreur.
      if (newBg[prop] === null || newBg[prop] === undefined || newBg[prop] === '') {
        const champ = prop.slice(2);  
        setAddFormErrorMsg(`Le champ ${champ} n'est pas renseigné.`);
        setAddFormError(true);
        return;

      // Si les propriétés categories ou themes ont une length de 0 c'est qu'elles sont vides, on ne continue pas et on met à jour le message d'erreur. 
      } else if (prop === 'bgCategories' || prop === 'bgThemes') {
        if (newBg[prop].length === 0) {
          const champ = prop.slice(2);  
          setAddFormErrorMsg(`Le champ ${champ} n'est pas renseigné.`);
          setAddFormError(true);  
          return;
        }
      
      }
    }
    // Si tout est ok on appelle postNewBg
    postNewBg(newBg);
  }

  const postNewBg = (newBg) => {
    const url = BASE_URL + '/boardgames'
    setLoading(true);
    axios({
      method: 'post',
      url,
      data: {
        name: newBg.bgTitle,
        min_players: parseInt(newBg.bgMinPlayers),
        max_players: parseInt(newBg.bgMaxPlayers),
        min_age: parseInt(newBg.bgMinAge),
        duration: parseInt(newBg.bgDuration),
        picture_url: newBg.bgPictureUrl,
        difficulty_id: newBg.bgDifficulty
      }
    })
      .then((res) => {
        const {data} = res;
        console.log('data après ajout du jeu:', data);
        if (data.id) {
          newBg.id = data.id;
          console.log('newbg après ajout théorique de id : ', newBg)
          postCatOrTheme(newBg);
        }
      })
      .catch((err) => {
        console.log('error: ', err);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const postCatOrTheme = (newBg) => {
    axios({
      method: 'post',
      url: BASE_URL + '/boardgames/catortheme',
      data: {
        id: newBg.id,
        categories: newBg.bgCategories,
        themes: newBg.bgThemes
      }
    })
      .then((res) => {
        const {data} = res;
        console.log('data après ajout des cat et theme: ', data);
        if (data.categoriesSaved !== undefined) {
          newBg.categoriesSaved = data.categoriesSaved;      
        }
        if (data.themesSaved !== undefined) {
          newBg.themesSaved = data.themesSaved;
        }
        // Ici tout est OK donc on garde en mémoire dans le state le dernier jeu ajouté et on remet les valeurs par défaut de l'addFormData.
        setLastGameModified(newBg);
        setAddFormData(bgDefaultValues);
      })
      .catch((err) => {
        console.log('error :', err);
      });
  }

  return (
    <div className="ludorganizer">
      <Header />
      <Switch>
        <Route path="/boardgames">
        {
          !loading && <Boardgames boardgames={boardgames} categories={categories} />
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
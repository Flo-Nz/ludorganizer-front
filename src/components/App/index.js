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

  const bgDefaultValues = {
    bgTitle: '',
    bgMinPlayers: '',
    bgMaxPlayers: '',
    bgDuration: '',
    bgMinAge: '',
    bgPictureUrl: '',
    bgCategories: [],
    bgThemes: [],
    bgDifficulty: ''
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
    bgTitle: 'Titre du jeu',
    bgMinPlayers: 'Minimum de joueurs',
    bgMaxPlayers: 'Maximum de joueurs',
    bgDuration: 'Durée d\'une partie en minutes',
    bgMinAge: 'Âge requis pour jouer',
    bgPictureUrl: 'Uniquement .jpg, .png',
    bgCategory1: 'Catégorie principale du jeu',
    bgCategory2: 'Catégorie 2 (optionnelle)',
    bgCategory3: 'Catégorie 3 (optionnelle)',
    bgTheme1: 'Thème principal du jeu',
    bgTheme2: 'Thème 2 (optionnel)',
    bgDifficulty: 'Choisir une difficulté'
  }

  const defaultSubmitAddFormErr = {err: false, msg: ''};
  const defaultSubmitAddFormOk = {ok: false, msg: ''};

  const [loading, setLoading] = useState(false);
  const [boardgames, setBoardgames] = useState([]);
  const [categories, catLoading] = useGet(`${apiUrl}/categories`);
  const [themes, themesLoading] = useGet(`${apiUrl}/themes`);
  const [difficulties, diffLoading] = useGet(`${apiUrl}/difficulties`);  
  const [addFormData, setAddFormData] = useState(bgDefaultValues);
  const [addFormError, setAddFormError] = useState(bgDefaultError);
  const [addFormErrorMsg, setAddFormErrorMsg] = useState(bgDefaultErrorMsg);
  const [submitAddFormErr, setSubmitAddFormErr] = useState(defaultSubmitAddFormErr);
  const [submitAddFormOk, setSubmitAddFormOk] = useState(defaultSubmitAddFormOk);
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
        // Si l'option choisie est la valeur vide on ne veut pas insérer mais supprimer dans le tableau
        if (value === '') {
          newAddFormData.bgCategories.splice(index,1);
          setAddFormData(newAddFormData);
          return;
        } else {
          newAddFormData.bgCategories[index] = value;
          setAddFormData(newAddFormData);
          return;
        }
        
      }

      if (name.includes('bgTheme')) {
        setAddFormError(bgDefaultError);
        setAddFormErrorMsg(bgDefaultErrorMsg)
        const newAddFormData = {...addFormData};
        // On récupère le numéro de la catégorie choisie grâce au name qui termine par son numéro.
        const index = parseInt(name.substring(name.length - 1)) - 1;
        // Si l'option choisie est la valeur vide on ne veut pas insérer mais supprimer dans le tableau
        if (value === '') {
          newAddFormData.bgThemes.splice(index,1);
          setAddFormData(newAddFormData);
          return;
        } else {
          newAddFormData.bgThemes[index] = value;
          setAddFormData(newAddFormData);
          return;
        }
        
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
    if (name === 'bgMinPlayers' || name === 'bgMaxPlayers' || name === 'bgDuration' || name === 'bgMinAge') {
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
        // On remet la valeur par défaut si l'utilisateur a entré un mauvais nombre pour éviter que le nombre valide apparaisse comme une erreur.
        const newAddFormData = {...addFormData};
        newAddFormData[name] = bgDefaultValues[name];
        setAddFormData(newAddFormData);
        return;
      }
      if (parseInt(value) <= 0) {
        const errorMsg = {...addFormErrorMsg};
        errorMsg[name]= "La valeur ne peut être négative.";
        setAddFormErrorMsg(errorMsg);
        const error = {...addFormError};
        error[name] = true;
        setAddFormError(error);
        // On remet la valeur par défaut si l'utilisateur a entré un mauvais nombre pour éviter que le nombre valide apparaisse comme une erreur.
        const newAddFormData = {...addFormData};
        newAddFormData[name] = bgDefaultValues[name];
        setAddFormData(newAddFormData);
        return;
      }
    }

    if (name === 'bgDuration') {
      if (value !== '' && parseInt(value) <= 0) {
        const errorMsg = {...addFormErrorMsg};
        errorMsg[name]= `La durée d'un jeu ne peut pas être de ${value} minute.`;
        setAddFormErrorMsg(errorMsg);
        const error = {...addFormError};
        error[name] = true;
        setAddFormError(error);
        // On remet la valeur par défaut si l'utilisateur a entré un mauvais nombre pour éviter que le nombre valide apparaisse comme une erreur.
        const newAddFormData = {...addFormData};
        newAddFormData[name] = bgDefaultValues[name];
        setAddFormData(newAddFormData);
        return;
      }
    }

    if (name === 'bgMinAge') {
      if (value !== '' && (parseInt(value) <= 0 || parseInt(value) > 18) ) {
        const errorMsg = {...addFormErrorMsg};
        errorMsg[name]= `L'âge minimum ne peut être de ${value}.`;
        setAddFormErrorMsg(errorMsg);
        const error = {...addFormError};
        error[name] = true;
        setAddFormError(error);
        // On remet la valeur par défaut si l'utilisateur a entré un mauvais nombre pour éviter que le nombre valide apparaisse comme une erreur.
        const newAddFormData = {...addFormData};
        newAddFormData[name] = bgDefaultValues[name];
        setAddFormData(newAddFormData);
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
    
    if (parseInt(newBg.bgMaxPlayers) < parseInt(newBg.bgMinPlayers)) {
      const errorMsg = {...addFormErrorMsg};
      errorMsg.bgMaxPlayers= "Joueurs max ne peut être inférieur au minimum.";
      setAddFormErrorMsg(errorMsg);
      const error = {...addFormError};
      error.bgMaxPlayers = true;
      setAddFormError(error);
      return;

    }
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
    const url = apiUrl + '/boardgames'
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
        const newSubmitAddFormErr = {...submitAddFormErr};
        newSubmitAddFormErr.err = true;
        console.log('erreur : ', err);
        if (err.message.includes('409')) {
          newSubmitAddFormErr.msg = `Le jeu ${newBg.bgTitle} existe déjà en base !`
        } else {
          newSubmitAddFormErr.msg = `Erreur lors de l'ajout du jeu ${newBg.bgTitle}. Veuillez réessayer.`;
        }
        newSubmitAddFormErr.info = err;
        setSubmitAddFormErr(newSubmitAddFormErr);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const postCatOrTheme = (newBg) => {
    axios({
      method: 'post',
      url: apiUrl + '/boardgames/catortheme',
      data: {
        id: newBg.id,
        categories: newBg.bgCategories,
        themes: newBg.bgThemes
      }
    })
      .then((res) => {
        const {data} = res;
        if (data.categoriesSaved !== undefined) {
          newBg.categoriesSaved = data.categoriesSaved;      
        }
        if (data.themesSaved !== undefined) {
          newBg.themesSaved = data.themesSaved;
        }
        // Ici tout est OK donc on garde en mémoire dans le state le dernier jeu ajouté et on remet les valeurs par défaut de l'addFormData.
        setLastGameModified(newBg);
        setAddFormData(bgDefaultValues);
        // On s'assure que le submitAddFormErr soit bien remis à false.
        const newSubmitAddFormErr = {...submitAddFormErr};
        newSubmitAddFormErr.err = false;
        setSubmitAddFormErr(newSubmitAddFormErr);
        // On configure le message pour que le submitAddFormOk soit à true.
        const newSubmitAddFormOk = {...submitAddFormOk};
        newSubmitAddFormOk.ok = true;
        newSubmitAddFormOk.msg = `Le jeu ${newBg.bgTitle} a bien été ajouté à la base !`;
        setSubmitAddFormOk(newSubmitAddFormOk);
      })
      .catch((err) => {
        const newSubmitAddFormErr = {...submitAddFormErr};
        newSubmitAddFormErr.err = true;
        newSubmitAddFormErr.msg = `Erreur lors de l'ajout du jeu ${newBg.bgTitle}. Veuillez réessayer.`;
        newSubmitAddFormErr.info = err;
        console.log(newSubmitAddFormErr.info);
        setSubmitAddFormErr(newSubmitAddFormErr);
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
        <Route path="/signin">
          
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
            submitAddFormErr={submitAddFormErr}
            submitAddFormOk={submitAddFormOk}
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
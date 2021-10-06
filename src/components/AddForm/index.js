// == Import
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './styles.scss';
import { Box } from '@material-ui/system';
import { TextField, MenuItem, Card, CardHeader, CardMedia, Button, Grid, Alert, outlinedInputClasses, inputLabelClasses } from '@material-ui/core';
import { PeopleAlt, Brush, Category, Send, Assignment, BubbleChart } from '@material-ui/icons';
import apiUrl from '../../utils/api-url';

// == Composant
const AddForm = ({ categories, themes, difficulties, setLastGameModified, setLoading }) => {
  
  // Valeurs par défaut des différents states.
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

  // States nécessaires pour le fonctionnement de la page.
  const [addFormData, setAddFormData] = useState(bgDefaultValues);
  const [addFormError, setAddFormError] = useState(bgDefaultError);
  const [addFormErrorMsg, setAddFormErrorMsg] = useState(bgDefaultErrorMsg);
  const [submitAddFormErr, setSubmitAddFormErr] = useState(defaultSubmitAddFormErr);
  const [submitAddFormOk, setSubmitAddFormOk] = useState(defaultSubmitAddFormOk);
  
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
        console.log('data après save cat or theme', data);
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
    <div className="add">
      <Box
        component="form"
        autoComplete="off"
        sx={{
          width: '50%',
          margin: 'auto',
          textAlign: 'center',
          marginTop: '1em',
          marginBottom: '1em'
        }}
        onSubmit={(evt) => {
          evt.preventDefault();
          handleAddForm(addFormData);
        }}
      >
          <Card raised>
            <CardHeader title="Ajouter un jeu" justify="center" sx={{color: '#9FBAE6'}} />
            { submitAddFormErr.err && 
              <Alert severity="error">{submitAddFormErr.msg}</Alert>
            }
            { submitAddFormOk.ok && 
              <Alert severity="success">{submitAddFormOk.msg}</Alert>
            }
            { addFormData.bgPictureUrl && 
              <CardMedia
                style={{
                  width: "auto",
                  maxWidth: "80%",
                  maxHeight: "200px",
                  margin: "auto"
                }}
                component="img"
                image={addFormData.bgPictureUrl}
                alt={addFormData.bgTitle}
                  />}
          <TextField
              required
              id="bgTitle"
              name="bgTitle"
              label="Titre du jeu"
              value={addFormData.bgTitle}
              onChange={handleInputChange}
              error={addFormError.bgTitle}
              helperText={addFormErrorMsg.bgTitle}
              margin='dense'
              sx={{width: '70%'}}
              fullWidth
              />
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <CardHeader title="Nombre de joueurs" 
                avatar={<PeopleAlt />}
                justify="center"
              />
              <TextField
              required
              id="bgMinPlayers"
              name="bgMinPlayers"
              label="Joueurs Minimum"
              value={addFormData.bgMinPlayers}
              onChange={handleInputChange}
              error={addFormError.bgMinPlayers}
              helperText={addFormErrorMsg.bgMinPlayers}
              margin='dense'
              sx={{width: '80%'}}
              />
              <TextField
              required
              id="bgMaxPlayers"
              name="bgMaxPlayers"
              label="Joueurs Maximum"
              value={addFormData.bgMaxPlayers}
              onChange={handleInputChange}
              error={addFormError.bgMaxPlayers}
              helperText={addFormErrorMsg.bgMaxPlayers}
              margin='dense'
              sx={{width: '80%'}}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <CardHeader title="Durée - Âge" 
                avatar={<Assignment />}
                justify="center"
              />
              <TextField
              required
              id="bgDuration"
              name="bgDuration"
              label="Durée (minutes)"
              value={addFormData.bgDuration}
              onChange={handleInputChange}
              error={addFormError.bgDuration}
              helperText={addFormErrorMsg.bgDuration}
              margin='dense'
              sx={{width: '80%'}}
              />
              <TextField
              required
              id="bgMinAge"
              name="bgMinAge"
              label="Âge minimum"
              value={addFormData.bgMinAge}
              onChange={handleInputChange}
              error={addFormError.bgMinAge}
              helperText={addFormErrorMsg.bgMinAge}
              margin='dense'
              sx={{width: '80%'}}
              />
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <CardHeader title="Difficulté - Image" 
                avatar={<BubbleChart />}
                justify="center"
              />
              <TextField
                required
                id="bgDifficulty"
                name="bgDifficulty"
                select
                label="Difficulté"
                value={addFormData.bgDifficulty?addFormData.bgDifficulty: ''}
                onChange={handleInputChange}
                error={addFormError.bgDifficulty}
                helperText={addFormErrorMsg.bgDifficulty}
                margin='dense'
                placeholder='Difficulté'
                sx={{width: '80%'}}
                >
                <MenuItem value=''>{'-- Choisir une difficulté --'}</MenuItem>
                  {difficulties.map((difficulty) => <MenuItem key={difficulty.id} value={difficulty.id}>{difficulty.label}</MenuItem>)}
              </TextField>
              <TextField
                required
                id="bgPictureUrl"
                name="bgPictureUrl"
                label="Lien vers une image"
                value={addFormData.bgPictureUrl}
                onChange={handleInputChange}
                error={addFormError.bgPictureUrl}
                helperText={addFormErrorMsg.bgPictureUrl}
                placeholder="https://"
                margin='dense'
                sx={{width: '80%'}}
              />
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5em'
            }}>
              <CardHeader title="Catégorie(s)" 
                avatar={<Category />}
                justify="center"
              />
              <TextField
              required
              id="bgCategory1"
              name="bgCategory1"
              select
              label="Catégorie principale"
              value={addFormData.bgCategories[0]?addFormData.bgCategories[0]: ''}
              onChange={handleInputChange}
              error={addFormError.bgCategory1}
              helperText={addFormErrorMsg.bgCategory1}
              margin='dense'
              placeholder='Catégorie 1'
              sx={{width: '80%'}}
              >
                <MenuItem value=''>{'-- Choisir une catégorie --'}</MenuItem>
                {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
              </TextField>
              { addFormData.bgCategories.length >= 1 &&
                <TextField
                  id="bgCategory2"
                  name="bgCategory2"
                  select
                  label="Catégorie 2"
                  value={addFormData.bgCategories[1]?addFormData.bgCategories[1]: ''}
                  onChange={handleInputChange}
                  error={addFormError.bgCategory2}
                  helperText={addFormErrorMsg.bgCategory2}
                  margin='dense'
                  placeholder='Catégorie 2'
                  sx={{width: '80%'}}
                  >
                    <MenuItem value=''>{'-- Choisir une catégorie --'}</MenuItem>
                      {categories.filter(category => category.id !== addFormData.bgCategories[0])
                        .map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                </TextField>
              }
              { addFormData.bgCategories.length >= 2 &&
                <TextField
                  id="bgCategory3"
                  name="bgCategory3"
                  select
                  label="Catégorie 3"
                  value={addFormData.bgCategories[2]?addFormData.bgCategories[2]: ''}
                  onChange={handleInputChange}
                  error={addFormError.bgCategory3}
                  helperText={addFormErrorMsg.bgCategory3}
                  margin='dense'
                  placeholder='Catégorie 3'
                  sx={{width: '80%'}}
                >
                  <MenuItem value=''>{'-- Choisir une catégorie --'}</MenuItem>
                    {categories.filter(category => category.id !== addFormData.bgCategories[0]&& category.id !== addFormData.bgCategories[1])
                      .map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                </TextField>
              }
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5em'
            }}>
              <CardHeader title="Thème(s)" 
                avatar={<Brush />}
                justify="center"
              />
              <TextField
                required
                id="bgTheme1"
                name="bgTheme1"
                select
                label="Thème principal"
                value={addFormData.bgThemes[0]?addFormData.bgThemes[0]: ''}
                onChange={handleInputChange}
                error={addFormError.bgTheme1}
                helperText={addFormErrorMsg.bgTheme1}
                margin='dense'
                sx={{width: '80%'}}
              >
                <MenuItem value=''>{'-- Choisir un thème --'}</MenuItem>
                {themes.map((theme) => <MenuItem key={theme.id} value={theme.id}>{theme.name}</MenuItem>)}
              </TextField>
              { addFormData.bgThemes.length >= 1 &&
                <TextField
                  id="bgTheme2"
                  name="bgTheme2"
                  select
                  label="Thème 2"
                  value={addFormData.bgThemes[1]?addFormData.bgThemes[1]: ''}
                  onChange={handleInputChange}
                  error={addFormError.bgTheme2}
                  helperText={addFormErrorMsg.bgTheme2}
                  margin='dense'
                  placeholder='Thème 2'
                  sx={{width: '80%'}}
                >
                  <MenuItem value=''>{'-- Choisir un thème --'}</MenuItem>
                  {themes.filter(theme => theme.id !== addFormData.bgThemes[0])
                    .map((theme) => <MenuItem key={theme.id} value={theme.id}>{theme.name}</MenuItem>)}
                </TextField>
              }
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5em'
            }}>
              <Button variant="contained" endIcon={<Send />} type='submit' sx={{
                width: '60%', 
                backgroundColor: '#99BAE7',
                '&:hover': {
                  backgroundColor: '#E5B0CD'
                }}}>
                Send
              </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
      
    </div>
  )
}
export default AddForm;
// == Import
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Box } from '@material-ui/system';
import { TextField, MenuItem } from '@material-ui/core';

// == Composant
const AddForm = ( { addFormError, addFormErrorMsg, addFormData, handleAddForm, handleInputChange, categories, themes, difficulties} ) => {
  
  return (
    <div className="add">
      <h1 className="add-title">Ajouter un jeu</h1>
    <Box
      component="form"
      autoComplete="off"
    >
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
          fullWidth
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
        />
        <TextField 
          required
          id="bgPictureUrl"
          name="bgPictureUrl"
          label="Durée (minutes)"
          value={addFormData.bgPictureUrl}
          onChange={handleInputChange}
          error={addFormError.bgPictureUrl}
          helperText={addFormErrorMsg.bgPictureUrl}
          margin='dense'
        />
        <TextField
          required
          id="bgCategory1"
          name="bgCategory1"
          select
          label="Catégorie 1"
          value={addFormData.bgCategories[0] ? addFormData.bgCategories[0] : ''}
          onChange={handleInputChange}
          error={addFormError.bgCategory1}
          helperText={addFormErrorMsg.bgCategory1}
          margin='dense'
          placeholder='Catégorie 1'
        >
          {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
        </TextField>
        { addFormData.bgCategories.length >= 1 && 
          <TextField
            id="bgCategory2"
            name="bgCategory2"
            select
            label="Catégorie 2"
            value={addFormData.bgCategories[1] ? addFormData.bgCategories[1] : ''}
            onChange={handleInputChange}
            error={addFormError.bgCategory2}
            helperText={addFormErrorMsg.bgCategory2}
            margin='dense'
            placeholder='Catégorie 2'
          >
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
            value={addFormData.bgCategories[2] ? addFormData.bgCategories[2] : ''}
            onChange={handleInputChange}
            error={addFormError.bgCategory3}
            helperText={addFormErrorMsg.bgCategory3}
            margin='dense'
            placeholder='Catégorie 3'
          >
            {categories.filter(category => category.id !== addFormData.bgCategories[0] && category.id !== addFormData.bgCategories[1])
              .map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
          </TextField>
        }

    </Box>
    
    </div>
  )



  return (
    <div className="add">
      <h1 className="add-title">Ajouter un jeu</h1>

      <form className="add-form" onSubmit={(evt) => {
        evt.preventDefault();
        handleAddForm(addFormData);
      }}>
        <div className="add-form--main">
          {addFormError && (
            <div className="add-form--main--error">
              <p>{addFormErrorMsg}</p>
            </div>
          )}
          <h2 className="add-form--main--title">Informations générales</h2>
          
          <label htmlFor="bgMinPlayers">Minimum de Joueurs
            <input type="number" id="bgMinPlayers" name="bgMinPlayers" placeholder={1} onChange={handleInputChange} value={addFormData.bgMinPlayers}></input>
          </label>
          <label htmlFor="bgMaxPlayers">Maximum de Joueurs
            <input type="number" id="bgMaxPlayers" name="bgMaxPlayers" placeholder={4} onChange={handleInputChange} value={addFormData.bgMaxPlayers}></input>
          </label>
          <label htmlFor="bgDuration">Durée (minutes)
            <input type="number" id="bgDuration" name="bgDuration" placeholder={15} onChange={handleInputChange} value={addFormData.bgDuration}></input>
          </label>
          <label htmlFor="bgMinAge">Age minimum
            <input type="number" id="bgMinAge" name="bgMinAge" placeholder={10} onChange={handleInputChange} value={addFormData.bgMinAge}></input>
          </label>
          <label htmlFor="bgPictureUrl">Lien vers une image
            <input type="text" id="bgPictureUrl" name="bgPictureUrl" placeholder="https://bakaminder.com/images/Default_img.png" onChange={handleInputChange} value={addFormData.bgPictureUrl}></input>
          </label>
        </div>
        <div className="add-form--infos">
          <h2 className="add-form--infos--title">Informations détaillées</h2>
          <label htmlFor="bgCategories">Catégories
            <select name="bgCategories" id="bgCategories" multiple onChange={handleInputChange}>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </label>
          <label htmlFor="bgThemes">Thèmes
            <select name="bgThemes" id="bgThemes" multiple onChange={handleInputChange}>
              {themes.map((theme) => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
            </select>
          </label>
          <label htmlFor="bgDifficulty">Difficulté
            <select name="bgDifficulty" id="bgDifficulty" onChange={handleInputChange}>
              {difficulties.map((difficulty) => <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>)}
            </select>
          </label>
        </div>
        <button type="submit">Ajouter le jeu</button>

      </form>
    </div>
  )
}

export default AddForm;